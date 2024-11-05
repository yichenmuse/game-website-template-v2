import { SocialShare } from '@/lib/components/social-icons';

export default function ShareButtons() {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  
  return (
    <SocialShare 
      url={currentUrl}
      text="查看这个很棒的网站！"
      className="mt-4"
    />
  );
} 