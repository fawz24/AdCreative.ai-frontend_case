import { CSSProperties } from "react";
import styles from "./loading.module.css";

export const Loading = () => {
  return (
    <div className="w-full flex justify-center gap-2">
      {Array(3)
        .fill(0)
        .map((_, i) => (
          <span
            key={i}
            style={{ "--loading-index": i } as CSSProperties}
            className={`bg-gray-3 w-3 h-3 rounded-full ${styles.loading}`}
          />
        ))}
    </div>
  );
};
