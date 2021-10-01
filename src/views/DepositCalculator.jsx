import { Container, CssBaseline, Box } from '@material-ui/core/';
import DepositSelector from '../components/DepositSelector';

const DepositCalculator = () => {
    return (
        <>
            {/* <CssBaseline /> */}
            <Container maxWidth="sm">
                <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }}>
                    <DepositSelector />
                </Box>
            </Container>
        </>
    );
};

export default DepositCalculator;
