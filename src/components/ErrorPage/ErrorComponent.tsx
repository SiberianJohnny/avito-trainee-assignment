import React from 'react'
import styles from './ErrorComponent.module.scss'

const ErrorComponent: React.FC = () => {
  return (
    <div className={styles.error_container}>Что-то пошло не так...</div>
  )
}

export default ErrorComponent