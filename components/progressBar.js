import styles from './progressBar.module.css'

export default function ProgressBar({value, color='green'}){
    let pbColor = styles.green
    if (color == 'red'){
        pbColor = styles.red
    }
    
    return (
        <div className={`${styles.container} ${pbColor}`}>
            <div className={styles.progressbar}>
                <div className={styles.progressMax} style={{ width : `${value}%` }}>
                    <span className={styles.progress}></span>
                </div>
            </div>
            <div className={styles.counter}>{value}%</div>
        </div>
    )
}