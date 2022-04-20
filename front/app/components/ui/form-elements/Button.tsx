import { FC } from 'react'
import cn from "classnames";
import {Button} from './form.interface'
import styles from './form.module.scss'

const Button: FC<Button> = ({children, className, ...rest}) => {
	return (
		<button className={cn(styles.button, className)} {...rest}>
			{children}
		</button>
	)
}

export default Button
