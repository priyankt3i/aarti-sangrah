import { useState, useEffect, useCallback, useRef } from 'react';
import { Capacitor } from '@capacitor/core';
import { KeepAwake } from '@capacitor-community/keep-awake';

export function useWakeLock(shouldKeepAwake: boolean) {
  const [isSupported, setIsSupported] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const wakeLockRef = useRef<WakeLockSentinel | null>(null);
  const isNative = Capacitor.isNativePlatform();

  useEffect(() => {
    if (isNative) {
      setIsSupported(true);
    } else {
      setIsSupported('wakeLock' in navigator);
    }
  }, [isNative]);

  const requestWakeLock = useCallback(async () => {
    if (!shouldKeepAwake) return;

    if (isNative) {
      try {
        await KeepAwake.keepAwake();
        setIsActive(true);
      } catch (err) {
        console.warn('Native KeepAwake failed:', err);
        setIsActive(false);
      }
      return;
    }

    if (!('wakeLock' in navigator)) return;

    try {
      if (wakeLockRef.current) return;

      const lock = await navigator.wakeLock.request('screen');
      wakeLockRef.current = lock;
      setIsActive(true);

      lock.addEventListener('release', () => {
        wakeLockRef.current = null;
        setIsActive(false);
      });
    } catch (err) {
      console.warn('Web Wake Lock request failed:', err);
      setIsActive(false);
    }
  }, [shouldKeepAwake, isNative]);

  const releaseWakeLock = useCallback(async () => {
    if (isNative) {
      try {
        await KeepAwake.allowSleep();
        setIsActive(false);
      } catch (err) {
        console.warn('Native allowSleep failed:', err);
      }
      return;
    }

    if (wakeLockRef.current) {
      try {
        await wakeLockRef.current.release();
        wakeLockRef.current = null;
        setIsActive(false);
      } catch (err) {
        console.warn('Web Wake Lock release failed:', err);
      }
    }
  }, [isNative]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && shouldKeepAwake) {
        requestWakeLock();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [requestWakeLock, shouldKeepAwake]);

  // Request when shouldKeepAwake turns true, release when false
  useEffect(() => {
    if (shouldKeepAwake) {
      requestWakeLock();
    } else {
      releaseWakeLock();
    }

    return () => {
      releaseWakeLock();
    };
  }, [shouldKeepAwake, requestWakeLock, releaseWakeLock]);

  return { isSupported, isActive, requestWakeLock, releaseWakeLock };
}
