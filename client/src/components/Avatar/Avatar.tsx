import { useState, useEffect } from "react";

import LibAvatar from "react-avatar";

const Avatar = ({ libAvatarProps, ...props }: { libAvatarProps: any }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <div {...props}>
        <LibAvatar {...libAvatarProps} />
      </div>
    </>
  );
};

export default Avatar;
