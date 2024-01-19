import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { ApiError } from '@/Types/TaskTypes';

export const useTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<ApiError | null>(null);
    const localToken = localStorage.getItem('token');

    const fetchTasks = useCallback(async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/tasks/",
                {
                    headers: {
                        Authorization: `Bearer ${localToken}`,
                    },
                }
            );
            setTasks(response.data);
            setFilteredTasks(response.data);
            setLoading(false);
        } catch (error) {
            setError(error as ApiError);
            setLoading(false);
        }
    }, [localToken]);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    return { tasks, filteredTasks, loading, error, fetchTasks };
};