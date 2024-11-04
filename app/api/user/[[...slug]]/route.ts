import type { NextApiRequest } from '@/env';
import { R } from '@/lib/utils';
import { AutoRouter } from 'itty-router';

const router = AutoRouter<NextApiRequest>({ basic: '/api/user' });

router.post('/', async () => {
  return R.ok();
});

export const POST = (request: any) => router.fetch(request);
export const GET = (request: any) => router.fetch(request);
