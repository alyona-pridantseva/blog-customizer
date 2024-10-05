import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';
import clsx from 'clsx';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

type TArrowBtnProps = {
	state?: boolean;
	openSidebar?: OnClick;
};

export const ArrowButton = ({ state, openSidebar }: TArrowBtnProps) => {
	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			onClick={openSidebar}
			className={clsx({
				[styles.container]: true,
				[styles.container_open]: state,
			})}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx({ [styles.arrow]: true, [styles.arrow_open]: state })}
			/>
		</div>
	);
};
