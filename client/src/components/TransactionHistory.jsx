/* GraphQL */
import { useQuery } from "@apollo/client";
import { GET_TRANSACTIONS } from "../graphql/queries/transaction.query";

import Card from "./Card";

const TransactionHistory = () => {
	const { data, loadingGetTransactions } = useQuery(GET_TRANSACTIONS);

	return (
		<div className='w-full px-10 min-h-[40vh]'>
			<p className='text-5xl font-bold text-center my-10'>History</p>
			{
				!loadingGetTransactions && !data?.transactions.length ? <p className="text-center w-full">No transaction history found.</p>
				: <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start mb-20'>
						{data?.transactions.map(transaction => (
							<Card key={transaction._id} transaction={transaction} />
						))}
					</div>
			}
		</div>
	);
};
export default TransactionHistory;