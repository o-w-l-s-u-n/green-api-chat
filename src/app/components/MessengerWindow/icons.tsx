export const DoneAll = ({ messageStatus }: { messageStatus?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="20"
      viewBox="0 96 960 960"
      width="20"
      fill={messageStatus === "read" ? "#53BDEB" : "#8CAEA6"}
    >
      <path d="M294 814 70 590l43-43 181 181 43 43-43 43Zm170 0L240 590l43-43 181 181 384-384 43 43-427 427Zm0-170-43-43 257-257 43 43-257 257Z" />
    </svg>
  );
};

export const Done = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="20"
      viewBox="0 96 960 960"
      width="20"
      fill="#8CAEA6"
    >
      <path d="M378 810 154 586l43-43 181 181 384-384 43 43-427 427Z" />
    </svg>
  );
};

export const Clock = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="20"
      viewBox="0 96 960 960"
      width="20"
      fill="#8CAEA6"
    >
      <path d="m627 769 45-45-159-160V363h-60v225l174 181ZM480 976q-82 0-155-31.5t-127.5-86Q143 804 111.5 731T80 576q0-82 31.5-155t86-127.5Q252 239 325 207.5T480 176q82 0 155 31.5t127.5 86Q817 348 848.5 421T880 576q0 82-31.5 155t-86 127.5Q708 913 635 944.5T480 976Zm0-400Zm0 340q140 0 240-100t100-240q0-140-100-240T480 236q-140 0-240 100T140 576q0 140 100 240t240 100Z" />
    </svg>
  );
};
