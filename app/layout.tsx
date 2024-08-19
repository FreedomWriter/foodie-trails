import type { Metadata } from 'next';
import './globals.css';
import ClientLayout from '@/client-layout';

export const metadata: Metadata = {
  title: 'Dry run',
  description: 'Generated by create next app',
};

// DOS-inspired appearance settings using specified variables
const appearance = {
  variables: {
    // Core Colors
    colorPrimary: 'rgb(0, 255, 0)', // DOS Green used throughout the components
    colorDanger: 'rgb(255, 0, 0)', // Bright Red for error states
    colorSuccess: 'rgb(0, 255, 0)', // DOS Green for success states
    colorWarning: 'rgb(255, 165, 0)', // Bright Orange for warning states
    colorNeutral: 'rgb(180, 180, 180)', // Even brighter grey for better readability

    // Text Colors
    colorText: 'rgb(0, 255, 0)', // DOS Green for general text
    colorTextOnPrimaryBackground: 'rgb(0, 0, 0)', // Black text on primary green background
    colorTextSecondary: 'rgb(220, 220, 220)', // Much brighter grey for secondary text

    // Backgrounds
    colorBackground: 'rgb(0, 0, 0)', // DOS Black for card container backgrounds
    colorInputText: 'rgb(0, 255, 0)', // DOS Green for input text
    colorInputBackground: 'rgb(0, 0, 0)', // DOS Black for input background
    colorShimmer: 'rgb(0, 255, 0)', // DOS Green for shimmer effect

    // Typography
    fontFamily: 'Courier New, Courier, monospace', // DOS-style font family throughout
    fontFamilyButtons: 'Courier New, Courier, monospace', // DOS-style font for buttons
    fontSize: '1rem', // Increased font size for better readability

    // Borders and Spacing
    borderRadius: '0.25rem', // Minimal border radius for a retro feel
    spacingUnit: '0.75rem', // Compact spacing for a retro look

    // Font Weights
    fontWeight: {
      normal: 400, // Normal weight
      medium: 600, // Medium weight for better readability
      semibold: 700, // Semi-bold weight for button text
      bold: 700, // Bold weight for emphasis
    },
  },

  elements: {
    card: 'rounded border-2 border-[rgb(0,255,0)] bg-[rgb(0,0,0)] shadow-[4px_4px_0px_rgb(0,255,0)] p-4',
    headerTitle: 'text-4xl font-dos text-[rgb(0,255,0)] mb-6 text-center',
    formButtonPrimary:
      'bg-[rgb(0,0,0)] text-[rgb(0,255,0)] border-2 border-[rgb(0,255,0)] shadow-[4px_4px_0px_rgb(0,255,0)] uppercase px-5 py-2 font-semibold text-lg',
    formFieldInput:
      'bg-[rgb(0,0,0)] text-[rgb(0,255,0)] border-2 border-[rgb(0,255,0)] p-2 rounded-sm shadow-inner placeholder-[rgb(180,180,180)]',
    footer: 'text-[rgb(220,220,220)] text-center mt-4 font-semibold text-lg', // Increased size and weight for readability
    userButton: {
      base: 'bg-[rgb(0,0,0)] text-[rgb(0,255,0)] border-2 border-[rgb(0,255,0)] p-2 rounded-sm font-semibold text-lg',
      hover:
        'hover:bg-[rgb(0,255,0)] hover:text-[rgb(0,0,0)] hover:border-[rgb(0,0,0)]',
      focus:
        'focus:outline-none focus:ring-2 focus:ring-[rgb(0,255,0)] focus:ring-opacity-50',
    },
    signInButton: {
      base: 'bg-[rgb(0,0,0)] text-[rgb(0,255,0)] border-2 border-[rgb(0,255,0)] p-2 rounded-sm font-semibold text-lg',
      hover:
        'hover:bg-[rgb(0,255,0)] hover:text-[rgb(0,0,0)] hover:border-[rgb(0,0,0)]',
      focus:
        'focus:outline-none focus:ring-2 focus:ring-[rgb(0,255,0)] focus:ring-opacity-50',
    },
    input: {
      base: 'bg-[rgb(0,0,0)] text-[rgb(0,255,0)] border-2 border-[rgb(0,255,0)] p-2 rounded-sm placeholder-[rgb(180,180,180)]',
      focus:
        'focus:border-[rgb(0,255,0)] focus:ring-2 focus:ring-[rgb(0,255,0)] focus:ring-opacity-50',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <ClientLayout appearance={appearance}>{children}</ClientLayout>
      </body>
    </html>
  );
}
