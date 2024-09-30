interface Props {
  mapRef: React.RefObject<HTMLDivElement>;
  isHidden: boolean;
}

export const Map: React.FC<Props> = ({ mapRef, isHidden }) => {
  return (
    <div
      ref={mapRef}
      className={`flex-grow h-full max-h-[calc(100vh-16rem)] ${isHidden ? 'hidden' : ''}`}
    />
  );
};
