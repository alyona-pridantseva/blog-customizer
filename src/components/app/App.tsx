import { useState, CSSProperties } from 'react';
import { Article } from '../article';
import { ArticleParamsForm } from '../article-params-form';
import {
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';
import styles from './App.module.scss';

export const App = () => {
	const [defaultArticle, setDefaultArticle] =
		useState<ArticleStateType>(defaultArticleState);

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': defaultArticle.fontFamilyOption.value,
					'--font-size': defaultArticle.fontSizeOption.value,
					'--font-color': defaultArticle.fontColor.value,
					'--container-width': defaultArticle.contentWidth.value,
					'--bg-color': defaultArticle.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				defaultArticle={defaultArticle}
				setDefaultArticle={setDefaultArticle}
			/>
			<Article />
		</main>
	);
};
