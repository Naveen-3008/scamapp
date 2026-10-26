/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AndroidPhoneShell } from './components/phone/AndroidPhoneShell';
import { usePhoneSimulator } from './hooks/usePhoneSimulator';

export default function App() {
  const sim = usePhoneSimulator();

  return (
    <main className="relative flex h-[100dvh] w-full items-center justify-center overflow-hidden bg-[#0B111E]">
      {/* Subtle ambient studio lighting behind framed iPhone 16 */}
      <div aria-hidden="true" className="pointer-events-none hidden sm:block">
        <div className="absolute -top-32 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-teal-600/12 blur-3xl" />
        <div className="absolute -bottom-32 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-sky-600/10 blur-3xl" />
      </div>

      <AndroidPhoneShell sim={sim} />
    </main>
  );
}
