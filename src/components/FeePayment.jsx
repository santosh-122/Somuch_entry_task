import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';

const classDetails = [
    {
        class_Id: 1,
        class_NAme: "Class-1",
    },
    {
        class_Id: 2,
        class_NAme: "Class-2",
    },
    {
        class_Id: 3,
        class_NAme: "Class-3",
    },
];

const FeeCategory = [
    {
        FEE_CATEGORY_ID: "1",
        FEE_CATEGORY_NAME: "School",
    },
    {
        FEE_CATEGORY_ID: "2",
        FEE_CATEGORY_NAME: "Tuition",
    },
    {
        FEE_CATEGORY_ID: "3",
        FEE_CATEGORY_NAME: "Exam",
    },
];
const Fee_Payment_Duration = [
    {
        FEE_PAYMENT_DURATION_ID: "1",
        FEE_PAYMENT_DURATION_NAME: "Yearly",
    },
    {
        FEE_PAYMENT_DURATION_ID: "2",
        FEE_PAYMENT_DURATION_NAME: "Half-Yearly",
    },
    {
        FEE_PAYMENT_DURATION_ID: "3",
        FEE_PAYMENT_DURATION_NAME: "QUARTERLY",
    },
    {
        FEE_PAYMENT_DURATION_ID: "4",
        FEE_PAYMENT_DURATION_NAME: "MONTHLY",
    },
];

const Fee_Shedule = [
    {
        FEE_SCHEDULE_ID: "1",
        FEE_SCHEDULE_NAME: "Yearly-Term",
        FEE_PAYMENT_DURATION_ID: "1",
    },
    {
        FEE_SCHEDULE_ID: "2",
        FEE_SCHEDULE_NAME: "HalfYear-Term1",
        FEE_PAYMENT_DURATION_ID: "2",
    },
    {
        FEE_SCHEDULE_ID: "3",
        FEE_SCHEDULE_NAME: "HalfYear-Term2 ",
        FEE_PAYMENT_DURATION_ID: "2",
    },
    {
        FEE_SCHEDULE_ID: "4",
        FEE_SCHEDULE_NAME: "Quarter-Term1",
        FEE_PAYMENT_DURATION_ID: "3",
    },
    {
        FEE_SCHEDULE_ID: "5",
        FEE_SCHEDULE_NAME: "Quarter-Term2",
        FEE_PAYMENT_DURATION_ID: "3",
    },
    {
        FEE_SCHEDULE_ID: "6",
        FEE_SCHEDULE_NAME: "Quarter-Term3",
        FEE_PAYMENT_DURATION_ID: "3",
    },
    {
        FEE_SCHEDULE_ID: "7",
        FEE_SCHEDULE_NAME: "Monthly-Term1 ",
        FEE_PAYMENT_DURATION_ID: "4",
    },
    {
        FEE_SCHEDULE_ID: "8",
        FEE_SCHEDULE_NAME: "Monthly-Term2",
        FEE_PAYMENT_DURATION_ID: "4",
    },
    {
        FEE_SCHEDULE_ID: "9",
        FEE_SCHEDULE_NAME: "Monthly-Term3",
        FEE_PAYMENT_DURATION_ID: "4",
    },
];
function MyComponent() {
    const [categoryCount, setCategoryCount] = useState(1);
    const [categories, setCategories] = useState([{ name: "", TotalFee: "" }]);
    const [TermAmount, setTermAmount] = useState({ FEE_CATEGORY_ID: null, FEE_SCHEDULE_ID: "", AMOUNT: "" })
    const [TermAmountOne, setTermAmountOne] = useState({ FEE_CATEGORY_ID: null, FEE_SCHEDULE_ID: "", AMOUNT: "" })
    const [TermAmountTwo, setTermAmountTwo] = useState({ FEE_CATEGORY_ID: null, FEE_SCHEDULE_ID: "", AMOUNT: "" })
    const [termAmounts, setTermAmounts] = useState([]);
    const [paymentDuration, setPaymentDuration] = useState([{ FEE_PAYMENT_DURATION_ID: "", CLASS_ID: "", FeeClassCategoryDetails: termAmounts }]);
    const [Feesheduled, setFeeshedule] = useState();
    const [error, setError] = useState(null);
    const [validation, setvalidation] = useState(null);
    const [apiCondition, setapiCondition] = useState(0);
    const [Totalfee, setTotal] = useState();
    const [apiValues, setApiValues] = useState([{}]);
    const [Target, settarget] = useState(5);

    useEffect(() => {
        let data = { FEE_PAYMENT_DURATION_ID: paymentDuration.FEE_PAYMENT_DURATION_ID, CLASS_ID: paymentDuration.CLASS_ID, FeeClassCategoryDetails: termAmounts }
        setPaymentDuration(data)
        let apiData = []
        apiData.push(data);
        setApiValues(apiData)
        if (paymentDuration.CLASS_ID !== null && paymentDuration.CLASS_ID !== "" && paymentDuration.CLASS_ID !== undefined && Target === 2) {
            setapiCondition(1)
        }
    }, [termAmounts])

    useEffect(() => {
        if (apiCondition === 1) {
            createValue();
            setapiCondition(0);
            settarget(5);
        }
    }, [apiCondition])

    const handleTermChange = (event) => {
        setTotal(event.target.value);
    };
    const handleTermAmountChange = (e) => {
        setTermAmount({ ...TermAmount, [e.target.name]: Number(e.target.value) })
        setTermAmountOne({ ...TermAmountOne, [e.target.name]: Number(e.target.value) })
        setTermAmountTwo({ ...TermAmountTwo, [e.target.name]: Number(e.target.value) });
        const sam = Fee_Shedule
            .filter(fee => Number(fee.FEE_PAYMENT_DURATION_ID) === paymentDuration.FEE_PAYMENT_DURATION_ID)
            .map(Feeid => Feeid.FEE_SCHEDULE_ID);
        setFeeshedule(sam)
    };
    const termChange = (e, index) => {
        if (index === 0 && TermAmount.FEE_CATEGORY_ID !== "") {
            setTermAmount({ ...TermAmount, [e.target.name]: Number(e.target.value), FEE_SCHEDULE_ID: Number(Feesheduled[0]) })
        }
        else {
            setError("please fill Category")

        };
        if (index === 1 && TermAmountOne.FEE_CATEGORY_ID !== "") {
            setTermAmountOne({ ...TermAmountOne, [e.target.name]: Number(e.target.value), FEE_SCHEDULE_ID: Number(Feesheduled[1]) })
        }
        else {
            setError("please fill Category")
        };
        if (index === 2 && TermAmountTwo.FEE_CATEGORY_ID !== "") {
            setTermAmountTwo({ ...TermAmountTwo, [e.target.name]: Number(e.target.value), FEE_SCHEDULE_ID: Number(Feesheduled[2]) })
        }
        else {
            setError("please fill Category")
        }
    };
    function handlePaymentDurationChange(data) {
        const { name, value, checked, textContent } = data.target;
        setPaymentDuration({ ...paymentDuration, [name]: Number(value) });
    }
    function createValue() {
        let TotaltermValue = TermAmount.AMOUNT + TermAmountOne.AMOUNT + TermAmountTwo.AMOUNT
        if (Totalfee == TotaltermValue) {
            axios.post('https://example.com/api', apiValues).then((res) => { console.log("final", res) })
                .catch(error => {
                    setError(error.message);
                })
            setvalidation("you have submitted data successfully please check api call for payload");
        }
        else {
            setvalidation("Total fee not equal to your term fee Please check for the api call")
        }
    }
    const handleAddCategory = () => {
        settarget(5);
        setCategoryCount(categoryCount + 1);
        setCategories([...categories, { name: "", term: "" }]);
        if (TermAmount.AMOUNT !== null || TermAmount.AMOUNT !== undefined || TermAmount.AMOUNT !== "") {
            setTermAmounts((termAmounts) => { return [...termAmounts, TermAmount] })
        }
        if (TermAmountOne.AMOUNT !== null && TermAmountOne.AMOUNT !== undefined && TermAmountOne.AMOUNT !== "") {
            setTermAmounts((termAmounts) => { return [...termAmounts, TermAmountOne] })
        }
        if (TermAmountTwo.AMOUNT !== null && TermAmountTwo.AMOUNT !== undefined && TermAmountTwo.AMOUNT !== "") {
            setTermAmounts((termAmounts) => { return [...termAmounts, TermAmountTwo] })
        }
    };

    const handleRemoveCategory = (index) => {
        if (categoryCount > 1) {
            setCategoryCount(categoryCount - 1);
            const updatedCategories = [...categories];
            updatedCategories.splice(index, 1);
            setCategories(updatedCategories);
        }
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        settarget(2);
        if (TermAmount.AMOUNT !== null || TermAmount.AMOUNT !== undefined || TermAmount.AMOUNT !== "") {
            setTermAmounts((termAmounts) => { return [...termAmounts, TermAmount] })
        }
        if (TermAmountOne.AMOUNT !== null && TermAmountOne.AMOUNT !== undefined && TermAmountOne.AMOUNT !== "") {
            setTermAmounts((termAmounts) => { return [...termAmounts, TermAmountOne] })
        }
        if (TermAmountTwo.AMOUNT !== null && TermAmountTwo.AMOUNT !== undefined && TermAmountTwo.AMOUNT !== "") {
            setTermAmounts((termAmounts) => { return [...termAmounts, TermAmountTwo] })
        }


    };
    const renderTermInputs = () => {
        const termInputCount = getTermInputCount();

        return Array.from({ length: termInputCount }).map((_, index) => (
            <>
                <div className="row mt-3">
                    <div key={index} className="col-md-4">
                        <label>
                            Term {index + 1}
                        </label>
                    </div>
                    <div key={index} className="col-md-4">
                        <input
                            placeholder=" Fee Amount(%)"
                            type="text"
                            name="AMOUNT"
                            id={`term${index + 1}Amount`}
                            disabled={(TermAmount.FEE_CATEGORY_ID !== null && TermAmountOne.FEE_CATEGORY_ID !== null && TermAmountTwo.FEE_CATEGORY_ID !== null) ? false : true}
                            onChange={(e) => termChange(e, index)}
                        />
                    </div>
                </div>
            </>
        ));
    };

    const getTermInputCount = () => {
        switch (paymentDuration?.FEE_PAYMENT_DURATION_ID) {
            case 1:
                return 1;
            case 2:
                return 2;
            case 3:
                return 3;
            case 4:
                return 3;
            default:
                return 0;
        }
    };
    return (
        <div>
            <div className="container mt-5">
                <h2>SO MUCH</h2>
                <form onSubmit={handleSubmit}>
                    <div className="row mt-3">
                        <div className="col-md-4">
                            <select
                                name="CLASS_ID"
                                className="form-control"
                                onChange={handlePaymentDurationChange}
                                required
                            >
                                <option value="" disabled selected>
                                    Choose an option
                                </option>
                                {classDetails.map((a) => (
                                    <option
                                        value={a.class_Id}
                                    >
                                        {a.class_NAme}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-6">
                            <select
                                name="FEE_PAYMENT_DURATION_ID"
                                className="form-control"
                                onChange={handlePaymentDurationChange}
                                required
                            >
                                <option value="" disabled selected>
                                    Choose an option
                                </option>
                                {Fee_Payment_Duration.map((option) => (
                                    <option value={option.FEE_PAYMENT_DURATION_ID}>
                                        {option.FEE_PAYMENT_DURATION_NAME}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {categories.map((category, index) => (
                        <div className="row mt-3" key={index}>
                            <div className="col-md-4">
                                <select
                                    name="FEE_CATEGORY_ID"
                                    className="form-control"
                                    onChange={handleTermAmountChange}
                                    required
                                >
                                    <option value="" disabled selected>
                                        Category - {index +1}
                                    </option>
                                    {FeeCategory.map((option) => (
                                        <option value={option.FEE_CATEGORY_ID}>
                                            {option.FEE_CATEGORY_NAME}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-4">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Total Fee"
                                    onChange={(event) => handleTermChange(event)}
                                    required
                                />
                            </div>
                            <div className="col-md-2">
                                <button
                                    type="button"
                                    className="btn btn-success mx-2"
                                    onClick={handleAddCategory}
                                >
                                    +
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => handleRemoveCategory(index)}
                                >
                                    -
                                </button>
                            </div>
                            <div>
                                {paymentDuration && renderTermInputs()}
                            </div>


                        </div>
                    ))}

                    <div className="mt-4">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </form>
                <h5 className='text-danger'>{validation}</h5>
            </div>
        </div>
    );
}

export default MyComponent;

