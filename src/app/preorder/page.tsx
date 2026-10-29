import { redirect } from 'next/navigation';

// /preorder → permanent redirect to Amazon store
export default function PreorderPage() {
  redirect('https://www.amazon.in/stores/AnvayaSmart');
}
