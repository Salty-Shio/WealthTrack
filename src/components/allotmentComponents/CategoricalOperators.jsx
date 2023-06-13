import React, {useState, useCallback, useEffect } from "react";
import OperatorListItem from "./OperatorListItem";

const CategoricalOperators = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Load data from local storage
        // debugger;
        console.log("Retrieve useEffect activated");
        let storedCategories = localStorage.getItem("categories");
        if (storedCategories) {
            storedCategories = JSON.parse(storedCategories);
            const newCategoryComponents = [];
            let count = 0;
            for (const storedCategory of storedCategories) {
                const newCategoryObject = getNewCategoryObject(storedCategory.balance, storedCategory.operator, storedCategory.value, storedCategory.envelope, storedCategory.transactions, storedCategory.key);
                const newCategoryComponent = <OperatorListItem  category={ newCategoryObject } 
                                                                removeSelf={handleRemoveCategory}/>
                newCategoryComponents.push(newCategoryComponent);
                console.log(count++);
            }
            setCategories(newCategoryComponents);
            console.log(categories);
        }
    }, []);

    function getNewCategoryObject(balance = "runningTotal", operator = '-', value = 0, envelope = "", transactions = [], key = categories.length > 0 ? categories[categories.length - 1].props.category.key + 1 : 0) {
        return {
            key,
            balance,
            operator,
            value,
            envelope,
            transactions, // List of transactions
        };
    }
    
    function handleCreateCategory() {
        const categoryObject = getNewCategoryObject();
        const newCategoryComponent = <OperatorListItem  category={ categoryObject } 
                                                        removeSelf={handleRemoveCategory}/>
        setCategories([...categories, newCategoryComponent]);
        
    }
    
    const handleRemoveCategory = useCallback(
        (key) => {
            setCategories((prevCategoryComponents) => {
                // removing object from local storage array
                const prevStoredCategories = JSON.parse(localStorage.getItem("categories"));
                const modifiedStoredCategories = prevStoredCategories.filter((storedCategory) =>
                    storedCategory.key !== key
                );
                
                localStorage.setItem("categories", JSON.stringify(modifiedStoredCategories));
                
                // Removing Components from categories array
                const modifiedCategoryComponents = prevCategoryComponents.filter((categoryComponent) =>
                    categoryComponent.props.category.key !== key
                );

                return modifiedCategoryComponents;
            });
        },
    []);

    return (
        <div>
            <h3> Categories </h3>
            <button onClick={handleCreateCategory}>Create New Category</button>
            <ol>
                {categories}
                {/* Auto Generated List of Operators */}
            </ol>
        </div>
    );
};

export default CategoricalOperators;