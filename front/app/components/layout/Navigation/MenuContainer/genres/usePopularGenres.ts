import { useQuery } from 'react-query'

import { IMenuItem } from '@/components/layout/Navigation/MenuContainer/menu.interface'

import { GenreService } from '@/services/genre.service'

import { getGenreUrl } from '@/config/url.config'

export const usePopularGenres = () => {
	const queryData = useQuery(
		'popular genre menu',
		() => GenreService.getAll(),
		{
			select: ({ data }) =>
				data
					.filter((g) => g.icon)
					.map(
						(genre): IMenuItem => ({
							icon: genre.icon,
							link: getGenreUrl(genre.slug),
							title: genre.name,
						})
					)
					.slice(0, 4),
		}
	)

	return queryData
}
