import { NavigateFunction, useNavigate, useLocation } from 'react-router-dom';
import moment from 'moment';
import { Card, CardBody, Chip, Spinner, Typography } from '@material-tailwind/react';
import { ScreenSize, PROJECT_HEADER } from '@constants';
import { useScreenSize } from '@hooks';
import { useProjectGeneralStore, useNavigationBarStore } from '@states';

export const ProjectGeneralPage: Component<{ projectSummary: ProjectGeneralData[] }> = ({
  projectSummary
}) => {
  const navigate: NavigateFunction = useNavigate();
  const { pathname } = useLocation();

  const { screenSize } = useScreenSize();
  const { projectGeneralStatus } = useProjectGeneralStore();
  const { setTypeMobileNavbar } = useNavigationBarStore();

  if (screenSize <= ScreenSize.MD) {
    return (
      <>
        {projectGeneralStatus === 'UNINIT' || projectGeneralStatus === 'PENDING' ? (
          <div className='grid justify-items-center items-center'>
            <Spinner color='green' className='h-12 w-12' />
            <span>Đang tải dữ liệu...</span>
          </div>
        ) : (
          <>
            {projectSummary.length === 0 && (
              <div className='text-center'>Không có dữ liệu trùng khớp</div>
            )}
            {projectSummary.map((data, index) => (
              <Card
                key={index}
                className='my-4 w-full cursor-pointer drop-shadow-2xl hover:ring-4 hover:ring-gray-400 focus:ring-gray-400'
                onClick={() => {
                  navigate(`${data.id}`);
                  setTypeMobileNavbar(`${pathname}/${data.id}`);
                }}
              >
                <CardBody className='flex flex-col justify-between'>
                  <div className='flex items-center justify-between'>
                    <Typography variant='h5' className='truncate'>
                      {data.name}
                    </Typography>
                    <Chip variant='ghost' value={data.status} />
                  </div>
                  <div className='grid grid-cols-7 items-center'>
                    <div className='col-span-5 flex items-center'>
                      <Chip variant='ghost' value={data.projectType} />
                    </div>
                    <div className='col-span-2 flex justify-end'>
                      <Chip variant='ghost' value={data.avatar[0].name} />
                    </div>
                  </div>
                  <Typography variant='small' className='font-normal'>
                    {data.description}
                  </Typography>
                </CardBody>
              </Card>
            ))}
          </>
        )}
      </>
    );
  } else {
    return (
      <Card className='h-full w-full drop-shadow-2xl p-4 min-h-screen overflow-x-scroll'>
        <CardBody>
          <table className='w-full table-auto text-left'>
            <thead>
              <tr>
                {PROJECT_HEADER.map((head, index) => {
                  return (
                    <th
                      key={index}
                      className={
                        'border-y border-blue-gray-100 bg-blue-gray-100/50 p-4 transition-colors truncate'
                      }
                    >
                      <Typography
                        variant='paragraph'
                        color='blue-gray'
                        className='flex items-center justify-between font-bold leading-none opacity-70'
                      >
                        {head}
                      </Typography>
                    </th>
                  );
                })}
              </tr>
            </thead>

            <tbody>
              {projectGeneralStatus === 'UNINIT' || projectGeneralStatus === 'PENDING' ? (
                <tr>
                  <td colSpan={PROJECT_HEADER.length}>
                    <div className='grid justify-items-center items-center'>
                      <Spinner color='green' className='h-12 w-12' />
                      <span>Đang tải dữ liệu...</span>
                    </div>
                  </td>
                </tr>
              ) : (
                <>
                  {projectSummary.length === 0 && (
                    <tr>
                      <td colSpan={PROJECT_HEADER.length} className='text-center'>
                        Không có dữ liệu trùng khớp
                      </td>
                    </tr>
                  )}
                  {projectSummary.map((data, index) => {
                    const classes = 'p-4 border-b border-blue-gray-100';

                    return (
                      <tr
                        key={index}
                        className='even:bg-blue-gray-50/50 cursor-pointer hover:bg-blue-50'
                        onClick={() => {
                          navigate(`${data.id}`);
                          setTypeMobileNavbar(`${pathname}/${data.id}`);
                        }}
                      >
                        <td className={classes}>
                          <Typography
                            variant='h5'
                            color='blue'
                            className='cursor-pointer hover:underline hover:underline-offset-auto !line-clamp-2'
                          >
                            {data.name}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Chip variant='ghost' value={data.projectType} />
                        </td>
                        <td className={classes}>
                          <Typography variant='small' className='font-normal !line-clamp-3'>
                            {data.description}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Chip variant='ghost' size='lg' value={data.status} className='w-fit' />
                        </td>
                        <td className={classes}>
                          <Chip variant='ghost' value={data.avatar[0].name} />
                        </td>
                        <td className={classes}>
                          <Typography color='blue-gray' className='font-normal text-xs'>
                            {moment.unix(data.startDate).locale('en-gb').format('MMM DD, YYYY')}
                          </Typography>
                          <Typography color='blue-gray' className='font-normal text-xs ml-1'>
                            {data.endDate === 0 ? (
                              <span className='italic'> - In progress</span>
                            ) : (
                              moment.unix(data.endDate).locale('en-gb').format('MMM DD, YYYY')
                            )}
                          </Typography>
                        </td>
                      </tr>
                    );
                  })}
                </>
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    );
  }
};
