// Private array of chars to use
const CHARS: string[] =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");

interface UUIDGenerator {
  uuid: (len?: number, radix?: number) => string;
  // uuidFast: () => string;
  // uuidCompact: () => string;
}

// type tuuid = string | undefined;
const useUUIDGenerator = (): UUIDGenerator => {
  const uuid: UUIDGenerator = {
    uuid: (len: number = 0, radix: number = CHARS.length) => {
      let _uuid = '';
      const _radix = radix || CHARS.length;

      if (len) {
        // Compact form
        for (let i = 0; i < len; i++) _uuid += CHARS[(Math.random() * _radix)];
        return _uuid;
        // return Object.values(_uuid).join("");
      }

      // rfc4122, version 4 form
      let d: number = new Date().getTime();
      // if (window.performance && typeof window.performance.now === "function") {
      //     d += performance.now(); // use high-precision timer if available
      // }
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c: string) => {
          const r = (d + Math.random() * 16) % 16 | 0;
          d = Math.floor(d / 16);
          return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
      });
    },

    // uuidFast: () => {
    //   const chars = CHARS;
    //   const generatedUUID: string[] = new Array(36);
    //   let rnd = 0;
    //   let r;
    //   for (let i = 0; i < 36; i++) {
    //     if (i === 8 || i === 13 || i === 18 || i === 23) {
    //       generatedUUID[i] = "-";
    //     } else if (i === 14) {
    //       generatedUUID[i] = "4";
    //     } else {
    //       if (rnd <= 0x02) rnd = (0x2000000 + Math.random() * 0x1000000) | 0;
    //       r = rnd & 0xf;
    //       rnd = rnd >> 4;
    //       generatedUUID[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r] as string;
    //     }
    //   }
    //   return generatedUUID.join("");
    // },

    // uuidCompact: () => {
    //   return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    //     const r = (Math.random() * 16) | 0;
    //     const v = c === "x" ? r : (r & 0x3) | 0x8;
    //     return v.toString(16);
    //   });
    // },
  };

  return uuid;
};

export default useUUIDGenerator;
