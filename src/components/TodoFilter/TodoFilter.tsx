import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { setFilter } from "../../store/todos/Slices/slice";
import { selectInfo, selectFilter } from "../../Modules/todos/selectors";
import { Button } from "antd";

import styles from "./TodoFilter.module.css";

export function TodoFilter() {
  const dispatch = useDispatch();
  const info = useSelector((state: RootState) => selectInfo(state));
  const activeFilter = useSelector((state: RootState) => selectFilter(state));
  return (
    <div className={styles.filter}>
      <Button
        size="large"
        type="text"
        className={activeFilter === "all" ? styles.active : ""}
        onClick={() => dispatch(setFilter("all"))}
      >
        Все{info.all}
      </Button>

      <Button
        size="large"
        type="text"
        className={activeFilter === "inWork" ? styles.active : ""}
        onClick={() => dispatch(setFilter("inWork"))}
      >
        В прогрессе{info.inWork}
      </Button>

      <Button
        size="large"
        type="text"
        className={activeFilter === "completed" ? styles.active : ""}
        onClick={() => dispatch(setFilter("completed"))}
      >
        Завершенные{info.completed}
      </Button>
    </div>
  );
}
