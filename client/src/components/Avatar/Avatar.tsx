import { useState, useEffect } from "react";

import LibAvatar from "react-avatar";

const Avatar = ({
  libAvatarProps,
  toggleDropdown,
}: {
  libAvatarProps: any;
  toggleDropdown?: any;
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
