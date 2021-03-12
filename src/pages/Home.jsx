import React from 'react';
import { Categories, SortPopup, PizzaBlock, LoadingBlock } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory, setSortBy } from '../redux/actions/filters';
import { fetchPizzas } from '../redux/actions/pizzas';
import { addPizzaToCart } from '../redux/actions/cart';

const categoryNames = [
	'Мясные',
	'Вегетарианская',
	'Гриль',
	'Острые',
	'Закрытые',
];
const sortItems = [
	{ name: 'популярности', type: 'rating', order: 'desc' },
	{ name: 'цене', type: 'price', order: 'desc' },
	{ name: 'алфавиту', type: 'name', order: 'asc' },
];

const Home = () => {
	const dispatch = useDispatch();
	const items = useSelector(({ pizzas }) => pizzas.items);
	const cartItems = useSelector(({ cart }) => cart.items);
	const isLoaded = useSelector(({ pizzas }) => pizzas.isLoaded);
	const { category, sortBy } = useSelector(({ filters }) => filters);

	React.useEffect(() => {
		dispatch(fetchPizzas(sortBy, category));
	}, [category, sortBy]);

	const onSelectCategory = React.useCallback((index) => {
		dispatch(setCategory(index));
	}, []);

	const onSelectSortType = React.useCallback((type) => {
		dispatch(setSortBy(type));
	}, []);

	const handleAddPizzaToCart = React.useCallback((obj) => {
		dispatch(addPizzaToCart(obj));
	}, []);

	return (
		<div className='container'>
			<div className='content__top'>
				<Categories
					activeCategory={category}
					onClickItem={onSelectCategory}
					items={categoryNames}
				/>
				<SortPopup
					activeSortType={sortBy.type}
					onClickSort={onSelectSortType}
					items={sortItems}
				/>
			</div>
			<h2 className='content__title'>Все пиццы</h2>
			<div className='content__items'>
				{isLoaded
					? items.map((obj) => (
							<PizzaBlock
								onClickAddPizza={handleAddPizzaToCart}
								addedCount={cartItems[obj.id] && cartItems[obj.id].items.length}
								key={obj.id}
								{...obj}
							/>
					  ))
					: Array(3)
							.fill(0)
							.map((_, index) => <LoadingBlock key={index} />)}
			</div>
		</div>
	);
};

export default Home;
