import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  fetchTotalDonationsByMonth,
  fetchTotalUniqueDonors,
  fetchTotalRepeatedDonors,
  fetchTopDonors,
  fetchAverageDonationAmount,
  fetchDonationFrequency
} from '../../redux/store/donationAnalyticsSlice';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PieController,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import {Chart,ArcElement} from 'chart.js';

// Register the chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, PieController, Title, Tooltip, Legend);
Chart.register(ArcElement)

const DonationAnalyticsComponent = () => {
  const dispatch = useDispatch();
  const { data, status, error } = useSelector(state => state.donationAnalytics || {});

  useEffect(() => {
    dispatch(fetchTotalDonationsByMonth());
    dispatch(fetchTotalUniqueDonors());
    dispatch(fetchTotalRepeatedDonors());
    dispatch(fetchTopDonors());
    dispatch(fetchAverageDonationAmount());
    dispatch(fetchDonationFrequency());
  }, [dispatch]);

  // Prepare the chart data for Total Donations by Month
  const totalDonationsByMonthData = data.totalDonationsByMonth && {
    labels: data.totalDonationsByMonth.map(d => `${d._id.month}/${d._id.year}`),
    datasets: [
      {
        label: 'Total Donations',
        data: data.totalDonationsByMonth.map(d => d.totalAmount),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        borderColor: 'rgba(53, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Total Donations by Month',
      },
    },
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Top Donors',
      },
    },
  };

  // Prepare the chart data for Top Donors
  const topDonorsData = data.topdonors && {
    labels: data.topdonors.map(donor => donor.name),
    datasets: [
      {
        label: 'Top Donors',
        data: data.topdonors.map(donor => donor.totalAmount),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error loading the analytics data: {error}</p>}
      {status === 'succeeded' && (
        <>
          <div>
            {data.totalDonationsByMonth && data.totalDonationsByMonth.length > 0 && (
              <>
                <p>Total Donations by Month:</p>
                <Bar data={totalDonationsByMonthData} options={options} />
              </>
            )}
          </div>
          <div className="flex flex-wrap">
            <div className='border-2 w-2/3 p-4 rounded-lg bg-gradient-to-l from-indigo-600 to-indigo-700 text-white mb-4'>
              {data.totaluniquedonors && data.totaluniquedonors.length > 0 && (
                <p className="mb-2 text-lg font-semibold">Total Unique Donors: {data.totaluniquedonors[0].totalDonors}</p>
              )}
              {data.totalrepeateddonors && data.totalrepeateddonors.length > 0 && (
                <p className="mb-2 text-lg font-semibold">Total Repeated Donors: {data.totalrepeateddonors[0].repeatedDonors}</p>
              )}
              {data.averagedonationamount && data.averagedonationamount.length > 0 && (
                <p className="mb-2 text-lg font-semibold">Average Donation Amount: ₹{data.averagedonationamount[0].averageAmount.toFixed(2)}</p>
              )}
              {data.donationfrequency && data.donationfrequency.length > 0 && (
                <p className="mb-2 text-lg font-semibold">Donation Frequency: {data.donationfrequency[0].averageFrequency.toFixed(2)} donations per donor</p>
              )}
              {data.topdonors && data.topdonors.length > 0 && (
                <div>
                  <h3 className="mb-2 text-lg font-semibold">Top Donors</h3>
                  <ul>
                    {data.topdonors.map((donor, index) => (
                      <li key={index} className="mb-1 text-lg font-semibold">{`Donor Name: ${donor.name}, Total Amount: ₹${donor.totalAmount}`}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3">
              {data.topdonors && data.topdonors.length > 0 && (
                <div className='border-2 p-4 rounded-lg bg-gray-100 mb-4'>
                  <h3 className="mb-2 text-lg font-semibold">Top Donors Pie Chart</h3>
                  <Pie data={topDonorsData} options={pieOptions} />
                </div>
              )}
            </div>
          </div>
          <div className=''>
            <Link to="/make-donation">
              <button className="bg-blue-500 mx-4 text-white mt-4 px-6 py-2 rounded-md">Make a Donation</button>
            </Link>
            <Link to="/donation-history">
              <button className="bg-blue-500 mx-4 text-white mt-4 px-6 py-2 rounded-md">Donation History</button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default DonationAnalyticsComponent;
