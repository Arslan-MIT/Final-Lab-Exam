import { useState, useEffect } from 'react';
import {
    getDatabase,
    ref,
    onValue,
} from 'firebase/database';
import app from './firebase';

const useFastFoodData = (initialSortOrder = 'asc') => {
    const [fastFoodData, setFastFoodData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState(initialSortOrder);

    useEffect(() => {
        const fetchData = async () => {
            const db = getDatabase(app);
            const fastFoodCollection = ref(db, 'fastFood');

            const unsubscribe = onValue(fastFoodCollection, (snapshot) => {
                const data = Object.entries(snapshot.val() || {}).map(([key, value]) => ({
                    key,
                    ...value,
                }));

                setFastFoodData(data);
                filterData(data, searchQuery);
            });

            return () => unsubscribe();
        };

        fetchData();
    }, [searchQuery]);

    const toggleSortOrder = () => {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const filterData = (data, query) => {
        if (!data) {
            setFilteredData([]);
            return;
        }

        const filtered = data.filter((item) => {
            const name = (item.name || '').toLowerCase();
            const city = (item.city || '').toLowerCase();
            const state = (item.state || '').toLowerCase();

            return (
                name.includes(query.toLowerCase()) ||
                city.includes(query.toLowerCase()) ||
                state.includes(query.toLowerCase())
            );
        });

        const sortedData = filtered.sort((a, b) => {
            const sortOrderFactor = sortOrder === 'asc' ? 1 : -1;
            return sortOrderFactor * (a.rank - b.rank);
        });

        const sections = sortedData.reduce((acc, item) => {
            const state = item.state || 'Other';
            const existingSection = acc.find((section) => section.title === state);

            if (existingSection) {
                existingSection.data.push(item);
            } else {
                acc.push({ title: state, data: [item] });
            }

            return acc;
        }, []);

        setFilteredData(sections);
    };

    return {
        fastFoodData,
        filteredData,
        searchQuery,
        setSearchQuery,
        toggleSortOrder,
    };
};

export default useFastFoodData;
