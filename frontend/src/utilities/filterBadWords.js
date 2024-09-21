import filter from 'leo-profanity';

const filterBadWords = (text) => {

    filter.clearList()

    filter.add(filter.getDictionary('en'))
    filter.add(filter.getDictionary('fr'))
    filter.add(filter.getDictionary('ru'))

    return filter.clean(text)
}

export default filterBadWords