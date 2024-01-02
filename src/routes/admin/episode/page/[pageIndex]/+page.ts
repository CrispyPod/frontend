export function load({ params }) {

    let curPage = Number(params.pageIndex) ?? 1;

    return { curPage };
}