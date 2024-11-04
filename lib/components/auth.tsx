'use client';
import { fetchGet } from '@/lib/utils/requests';
import { useEffect } from 'react';

export function Auth() {
	useEffect(() => {
		fetchGet("/api/auth").catch((e) => {
			console.error("auth error:", e)
		})
	}, [])
	return <></>
}
