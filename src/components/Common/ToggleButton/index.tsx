import React from 'react';

type ToggleButtonProps = {
  toggled: boolean;
  onToggle: () => void;
  onIcon: React.ReactNode;
  offIcon: React.ReactNode;
};

function ToggleButton({
  toggled,
  onToggle,
  onIcon,
  offIcon,
}: ToggleButtonProps) {
  return (
    <button type="button" onClick={() => onToggle()}>
      {toggled ? onIcon : offIcon}
    </button>
  );
}

export default ToggleButton;
