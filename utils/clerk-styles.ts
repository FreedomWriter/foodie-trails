export const appearance = {
  variables: {
    colorPrimary: 'rgb(0, 255, 0)',
    colorDanger: 'rgb(255, 0, 0)',
    colorSuccess: 'rgb(0, 255, 0)',
    colorWarning: 'rgb(255, 165, 0)',
    colorNeutral: 'rgb(180, 180, 180)',
    colorText: 'rgb(0, 255, 0)',
    colorTextOnPrimaryBackground: 'rgb(0, 0, 0)',
    colorTextSecondary: 'rgb(220, 220, 220)',
    colorBackground: 'rgb(0, 0, 0)',
    colorInputText: 'rgb(0, 255, 0)',
    colorInputBackground: 'rgb(0, 0, 0)',
    colorShimmer: 'rgb(0, 255, 0)',
    fontFamily: 'Courier New, Courier, monospace',
    fontFamilyButtons: 'Courier New, Courier, monospace',
    fontSize: '1rem',
    borderRadius: '0.25rem',
    spacingUnit: '0.75rem',
    fontWeight: {
      normal: 400,
      medium: 600,
      semibold: 700,
      bold: 700,
    },
  },
  elements: {
    card: 'rounded border-2 border-[rgb(0,255,0)] bg-[rgb(0,0,0)]  p-4',
    headerTitle: 'text-4xl font-dos text-[rgb(0,255,0)] mb-6 text-center',
    formButtonPrimary:
      'bg-[rgb(0,0,0)] text-[rgb(0,255,0)] border-2 border-[rgb(0,255,0)]  uppercase px-5 py-2 font-semibold text-lg',
    formFieldInput:
      'bg-[rgb(0,0,0)] text-[rgb(0,255,0)] border-2 border-[rgb(0,255,0)] p-2 rounded-sm shadow-inner placeholder-[rgb(180,180,180)]',
    footer: 'text-[rgb(220,220,220)] text-center mt-4 font-semibold text-lg',
    input: {
      base: 'bg-[rgb(0,0,0)] text-[rgb(0,255,0)] border-2 border-[rgb(0,255,0)] p-2 rounded-sm placeholder-[rgb(180,180,180)]',
      focus:
        'focus:border-[rgb(0,255,0)] focus:ring-2 focus:ring-[rgb(0,255,0)] focus:ring-opacity-50',
    },
  },
};
