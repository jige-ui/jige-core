import { PaginatorCore } from '@/build'

export default function TestPaginator() {
	return (
		<div>
			<PaginatorCore total={2500} currPage={6} pageSize={20}>
				<PaginatorCore.Pager>
					{(page) => <span class='mr-1 bg-gray-2'>{page}</span>}
				</PaginatorCore.Pager>
			</PaginatorCore>
		</div>
	)
}
