import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Box,
    TextField,
    Typography,
    Stack,
    IconButton,
    CircularProgress
} from '@mui/material';
import { AddCircle, RemoveCircle } from '@mui/icons-material';
import { PurpleButton } from '../../../components/buttonStyles';
import Popup from '../../../components/Popup';
import { addStudentFees } from '../../../redux/studentRelated/studentHandle'; // Import your Redux action here

const StudentFees = () => {
    const dispatch = useDispatch();
    const { loading, response, error } = useSelector((state) => state.student); // Adjust according to your Redux state structure

    const [name, setName] = useState('');
    const [rollNo, setRollNo] = useState('');
    const [totalFees, setTotalFees] = useState('');
    const [installments, setInstallments] = useState([{ amount: '', date: '' }]);
    const [remainingFees, setRemainingFees] = useState('');
    const [loader, setLoader] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState('');

    const addInstallment = () => {
        setInstallments([...installments, { amount: '', date: '' }]);
    };

    const removeInstallment = (index) => {
        const updatedInstallments = [...installments];
        updatedInstallments.splice(index, 1);
        setInstallments(updatedInstallments);
    };

    const handleInstallmentChange = (index, field, value) => {
        const updatedInstallments = [...installments];
        updatedInstallments[index][field] = value;
        setInstallments(updatedInstallments);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoader(true);
        // Calculate remaining fees
        const totalInstallmentAmount = installments.reduce((total, installment) => total + parseFloat(installment.amount), 0);
        const remainingFees = parseFloat(totalFees) - totalInstallmentAmount;
        setRemainingFees(remainingFees.toFixed(2)); // Ensure to round to two decimal places
        // Dispatch action to add student fees
        dispatch(addStudentFees({ name, rollNo, totalFees, installments, remainingFees }))
            .then(() => {
                setLoader(false);
                setShowPopup(true);
                setMessage('Student fees added successfully');
            })
            .catch((error) => {
                setLoader(false);
                setShowPopup(true);
                setMessage('Failed to add student fees: ' + error.message);
            });
    };

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <>
                    <Box
                        sx={{
                            flex: '1 1 auto',
                            alignItems: 'center',
                            display: 'flex',
                            justifyContent: 'center'
                        }}
                    >
                        <Box
                            sx={{
                                maxWidth: 550,
                                px: 3,
                                py: '100px',
                                width: '100%'
                            }}
                        >
                            <Typography variant="h4">Add Student Fees</Typography>
                            <form onSubmit={handleSubmit}>
                                <Stack spacing={3}>
                                    <TextField
                                        label="Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                    <TextField
                                        label="Roll No"
                                        value={rollNo}
                                        onChange={(e) => setRollNo(e.target.value)}
                                        required
                                    />
                                    <TextField
                                        label="Total Fees"
                                        type="number"
                                        value={totalFees}
                                        onChange={(e) => setTotalFees(e.target.value)}
                                        required
                                    />
                                    {installments.map((installment, index) => (
                                        <div key={index}>
                                            <TextField
                                                label={`Installment Amount ${index + 1}`}
                                                type="number"
                                                value={installment.amount}
                                                onChange={(e) => handleInstallmentChange(index, 'amount', e.target.value)}
                                                required
                                            />
                                            <TextField
                                                label={`Installment Date ${index + 1}`}
                                                type="date"
                                                value={installment.date}
                                                onChange={(e) => handleInstallmentChange(index, 'date', e.target.value)}
                                                required
                                            />
                                            {index > 0 && (
                                                <IconButton onClick={() => removeInstallment(index)}>
                                                    <RemoveCircle />
                                                </IconButton>
                                            )}
                                        </div>
                                    ))}
                                    <IconButton onClick={addInstallment}>
                                        <AddCircle />
                                    </IconButton>
                                    <Typography>Remaining Fees: {remainingFees}</Typography>
                                </Stack>
                                <PurpleButton
                                    fullWidth
                                    size="large"
                                    sx={{ mt: 3 }}
                                    variant="contained"
                                    type="submit"
                                    disabled={loader}
                                >
                                    {loader ? <CircularProgress size={24} color="inherit" /> : "Submit"}
                                </PurpleButton>
                            </form>
                        </Box>
                    </Box>
                    <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
                </>
            )}
        </>
    );
};

export default StudentFees;
