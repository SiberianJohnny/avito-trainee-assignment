import styles from "./LoadingSpinner.module.scss";

interface Props {
  withHeader?: boolean;
}

export default function LoadingSpinner({withHeader}: Props) {
  return (
    <div className={withHeader ? styles.spinner_container_header : styles.spinner_container}>
      <div className={styles.loading_spinner}>
      </div>
    </div>
  );
}