import { useState, useEffect, useRef, FormEvent } from 'react';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { RadioGroup } from '../radio-group';
import { Select } from '../select';
import { Separator } from '../separator';
import { Text } from '../text';

import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

type TArticleParamsFormProps = {
	defaultArticle: ArticleStateType;
	setDefaultArticle: (articleState: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	defaultArticle,
	setDefaultArticle,
}: TArticleParamsFormProps) => {
	const [sidebarFormState, setSidebarFormState] = useState<boolean>(false);
	const [select, setSelect] = useState<ArticleStateType>(defaultArticle);
	const sidebarContainerRef = useRef<HTMLFormElement>(null);

	const handleOpenSidebar = () => {
		setSidebarFormState(!sidebarFormState);
	};

	function closeOutsideSidebar(event: MouseEvent) {
		if (
			sidebarContainerRef.current &&
			!sidebarContainerRef.current.contains(event.target as Node)
		) {
			setSidebarFormState(false);
		}
	}

	useEffect(() => {
		document.addEventListener('mousedown', closeOutsideSidebar);
		return () => {
			document.removeEventListener('mousedown', closeOutsideSidebar);
		};
	}, [sidebarFormState]);

	function addSelect(event: FormEvent) {
		event.preventDefault();
		setDefaultArticle(select);
	}

	function resetSelect() {
		setSelect(defaultArticleState);
		setDefaultArticle(defaultArticleState);
	}

	return (
		<>
			<ArrowButton state={sidebarFormState} openSidebar={handleOpenSidebar} />
			<aside
				className={clsx({
					[styles.container]: true,
					[styles.container_open]: sidebarFormState,
				})}
				ref={sidebarContainerRef}>
				<form
					className={styles.form}
					onSubmit={addSelect}
					onReset={resetSelect}>
					<Text as={'h2'} size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					<Select
						title='Шрифт'
						selected={select.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(option) =>
							setSelect({ ...select, fontFamilyOption: option })
						}
					/>

					<RadioGroup
						title='Размер шрифта'
						name='font-size'
						options={fontSizeOptions}
						selected={select.fontFamilyOption}
						onChange={(option) =>
							setSelect({ ...select, fontSizeOption: option })
						}
					/>

					<Select
						title='Цвет шрифта'
						selected={select.fontColor}
						options={fontColors}
						onChange={(option) => setSelect({ ...select, fontColor: option })}
					/>

					<Separator />

					<Select
						title='Цвет фона'
						selected={select.backgroundColor}
						options={backgroundColors}
						onChange={(option) =>
							setSelect({ ...select, backgroundColor: option })
						}
					/>

					<Select
						title='Ширина контента'
						selected={select.contentWidth}
						options={contentWidthArr}
						onChange={(option) =>
							setSelect({ ...select, contentWidth: option })
						}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
