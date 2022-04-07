import Navbar from '../components/Navbar';
import Layout from '../layout/Layout';
import BlueBlock from '../components/BlueBlock';
import styles from '../styles/HomePage.module.scss';

import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

import { useState, useEffect } from 'react';

const HomePage = (users, usersCount) => {
  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 10;
  const pages = Math.ceil(usersCount / perPage);

  const [usersLocal, setUsersLocal] = useState(users);
  const [firstLoad, setFirstLoad] = useState(true);
  const [loading, setLoading] = useState(false);

  const [titlesCountLoaded, setTitlesCountLoaded] = useState(false);

  const [mrsCount, setMrsCount] = useState(0);
  const [msCount, setMsCount] = useState(0);
  const [missCount, setMissCount] = useState(0);
  const [mrCount, setMrCount] = useState(0);

  const updateData = async () => {
    setLoading(true);

    const user_res = await fetch(
      `https://dummyapi.io/data/v1/user?limit=10&page=${currentPage}`,
      {
        headers: { 'app-id': '624ed13066a2f2131b2d3375' },
      }
    );

    let dummydata = await user_res.json();

    let updatedUsers = [];

    //Seems like the average request takes around 400ms to return a response, which is slow.
    //However, this is the most straightforward way to do it.
    for (const user of dummydata.data) {
      const user_res2 = await fetch(
        `https://dummyapi.io/data/v1/user/${user.id}`,
        {
          headers: { 'app-id': '624ed13066a2f2131b2d3375' },
        }
      );

      let { email } = await user_res2.json();

      updatedUsers.push({ ...user, email });
    }

    setLoading(false);
    setUsersLocal(updatedUsers);
  };

  useEffect(() => {
    if (!firstLoad) updateData();
    else setFirstLoad(false);
  }, [currentPage]);

  useEffect(() => {
    const f = async () => {
      let mr = 0;
      let miss = 0;
      let mrs = 0;
      let ms = 0;

      //The fastest way is to get a single request in.
      const user_res = await fetch(
        `https://dummyapi.io/data/v1/user?limit=10000`,
        {
          headers: { 'app-id': '624ed13066a2f2131b2d3375' },
        }
      );

      let dummydata = await user_res.json();

      mr += dummydata.data.filter((x) => x.title === 'mr').length;
      ms += dummydata.data.filter((x) => x.title === 'ms').length;
      miss += dummydata.data.filter((x) => x.title === 'miss').length;
      mrs += dummydata.data.filter((x) => x.title === 'mrs').length;

      setMissCount((miss / usersCount) * 100);
      setMrCount((mr / usersCount) * 100);
      setMsCount((ms / usersCount) * 100);
      setMrsCount((mrs / usersCount) * 100);

      setTitlesCountLoaded(true);
    };

    f();
  }, []);

  const getPaginationButtons = () => {
    let buttons = [];
    for (let p = 0; p < pages; p++) {
      buttons.push(
        <button
          className={styles.paginationButton}
          key={p}
          onClick={() => {
            setCurrentPage(p);
          }}
        >
          {p + 1}
        </button>
      );
    }

    return buttons;
  };

  //Chart options
  const options = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
    },
    title: {
      text: '',
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
    },
    accessibility: {
      point: {
        valueSuffix: '%',
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
        },
      },
    },
    series: [
      {
        name: 'Titles',
        colorByPoint: true,
        data: [
          {
            name: 'mr',
            y: mrCount,
          },
          {
            name: 'mrs',
            y: mrsCount,
          },
          {
            name: 'miss',
            y: missCount,
          },
          {
            name: 'ms',
            y: msCount,
          },
        ],
      },
    ],
  };

  return (
    <div className={'fl-column fl-full-center ' + styles.mainWrapper}>
      <Navbar />
      <div className='fl-row' style={{ width: '100%' }}>
        <div
          id='main-body'
          className={`fl-column fl-align-center ${styles.mainBody} ${styles.sideMenuOpen}`}
        >
          <div
            className={'fl-row'}
            style={{
              width: '90%',
              flexWrap: 'wrap-reverse',
              justifyContent: 'space-evenly',
              marginTop: '50px',
            }}
          >
            <BlueBlock number={3} />
            <BlueBlock number={4} />
            <BlueBlock number={5} />
            <BlueBlock number={6} />
          </div>
          <div
            className='fl-row fl-wrap '
            style={{
              justifyContent: 'space-evenly',
              marginTop: '50px',
              width: '100%',
            }}
          >
            <div className={'fl-column ' + styles.div1}>
              <div className='fl-column' style={{ overflow: 'auto' }}>
                <h3>Users List - Page {currentPage + 1}</h3>
                <div style={{ position: 'relative' }}>
                  <h3
                    style={{ position: 'absolute' }}
                    className={!loading ? styles.hideElement : ''}
                  >
                    Fetching data...
                  </h3>
                </div>

                <table
                  style={{ width: '100%' }}
                  className={loading ? styles.hideElement : ''}
                >
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Title</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className='tr-space'>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                    </tr>
                    {usersLocal.map((user) => {
                      return (
                        <tr key={user.id}>
                          <td>{user.id}</td>
                          <td>{user.title}</td>
                          <td>{user.firstName}</td>
                          <td>{user.lastName}</td>
                          <td>{user.email}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div
                className='fl-row fl-wrap'
                key={currentPage}
                style={{
                  marginTop: '15px',
                  marginBottom: '15px',
                  maxWidth: '80%',
                }}
              >
                {getPaginationButtons()}
              </div>
            </div>
            <div className={'fl-column ' + styles.div2}>
              <h2>Titles Distribution</h2>
              {titlesCountLoaded && (
                <HighchartsReact
                  highcharts={Highcharts}
                  options={options}
                  containerProps={{ className: styles.chartContainer }}
                />
              )}
              {!titlesCountLoaded && <h4>Loading pie chart...</h4>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

//I am using server side props to get pre-fetched data. This data will appear immediately once the page loads without any delays.
export async function getServerSideProps(context) {
  let users = [];
  let usersCount = 0;

  try {
    const user_res = await fetch(
      `https://dummyapi.io/data/v1/user?limit=10&page=0`,
      {
        headers: { 'app-id': '624ed13066a2f2131b2d3375' },
      }
    );

    let dummydata = await user_res.json();

    //This is the cleanest way to do this in the current context.
    //However, we can speed up data fetching by ditching this part and loading emails dynamically once the page loads instead.
    for (const user of dummydata.data) {
      const user_res2 = await fetch(
        `https://dummyapi.io/data/v1/user/${user.id}`,
        {
          headers: { 'app-id': '624ed13066a2f2131b2d3375' },
        }
      );

      let { email } = await user_res2.json();

      users.push({ ...user, email });
    }

    usersCount = dummydata.total;
  } catch (err) {
    console.log(err);
  }

  return {
    props: {
      users,
      usersCount,
    },
  };
}

export default function AppArtTask({ users, usersCount }) {
  const metaData = {
    title: 'App-art Task!',
    description: 'A task made for app-art.gr!',
    keywords: ['homepage', 'nextjs', 'app-art'],
  };

  return <Layout metaData={metaData} Component={HomePage(users, usersCount)} />;
}
