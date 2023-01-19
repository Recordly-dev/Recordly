import { useState, useEffect, MouseEventHandler } from "react";

import LibAvatar from "react-avatar";

interface Avatar {
  name: string;
  round: boolean;
  size: string;
  src: string;
  className?: string;
}

const Avatar = ({
  libAvatarProps,
  toggleDropdown,
}: {
  libAvatarProps: Avatar;
  toggleDropdown?: MouseEventHandler;
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <div onClick={toggleDropdown}>
        <LibAvatar {...libAvatarProps} />
      </div>
    </>
  );
};

export default Avatar;
