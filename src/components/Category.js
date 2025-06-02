import React, { useEffect, useState } from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap'
import { loadAllCategories } from '../services/category-service'
import { toast } from 'react-toastify'
import { Link, useLocation } from 'react-router-dom'
import { FaBookmark, FaHome } from 'react-icons/fa'

const Category = () => {
    const [categories, setCategories] = useState([])
    const location = useLocation()

    useEffect(() => {
        loadAllCategories()
            .then(data => {
                setCategories([...data])
            })
            .catch(error => {
                toast.error("Error loading categories")
            })
    }, [])

    const isActive = (path) => {
        return location.pathname === path
    }

    return (
        <div className="category-list">
            <ListGroup>
                <ListGroupItem
                    tag={Link}
                    to="/home"
                    action={true}
                    className={`category-item ${isActive('/') ? 'active' : ''}`}
                >
                    <FaHome className="me-2" />
                    <span>All Posts</span>
                </ListGroupItem>
                {categories && categories.map((cat, index) => (
                    <ListGroupItem
                        tag={Link}
                        to={'/categories/' + cat.categoryId}
                        key={index}
                        action={true}
                        className={`category-item ${isActive('/categories/' + cat.categoryId) ? 'active' : ''}`}
                    >
                        <FaBookmark className="me-2" />
                        <span>{cat.categoryName}</span>
                    </ListGroupItem>
                ))}
            </ListGroup>
        </div>
    )
}

export default Category
