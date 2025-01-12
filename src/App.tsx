import { useCallback, useMemo, useState } from "react";
import dayjs from "dayjs";
import { createMockData } from "./mock/appMock";
import { ParsedDatesRange } from "./utils/getDatesRange";
import { ConfigFormValues, SchedulerProjectData } from "./types/global";
import ConfigPanel from "./components/ConfigPanel";
import { StyledSchedulerFrame } from "./styles";
import { Scheduler } from ".";

function App() {
  const [values, setValues] = useState<ConfigFormValues>({
    peopleCount: 15,
    projectsPerYear: 5,
    yearsCovered: 0,
    startDate: undefined,
    maxRecordsPerPage: 50,
    isFullscreen: true
  });

  const { peopleCount, projectsPerYear, yearsCovered, isFullscreen, maxRecordsPerPage } = values;

  const mocked = useMemo(
    () => createMockData(+peopleCount, +yearsCovered, +projectsPerYear),
    [peopleCount, projectsPerYear, yearsCovered]
  );

  const [range, setRange] = useState<ParsedDatesRange>({
    startDate: new Date(),
    endDate: new Date()
  });

  const handleRangeChange = useCallback((range: ParsedDatesRange) => {
    setRange(range);
  }, []);

  const data1 = [
    {
      id: "d82c68ca-d4e4-46d1-8c6c-b3f6bfe4e78e",
      label: {
        icon: "https://picsum.photos/24",
        title: "Progressive scale",
        subtitle: "overriding"
      },
      data: []
    },
    {
      id: "6c0e1c8a-a40b-4f7e-9c07-bf892a1fe96a",
      label: {
        icon: "https://picsum.photos/24",
        title: "Fish superstructure",
        subtitle: "Modern"
      },
      data: [
        {
          id: "d1e25e40-4dd7-46dd-9c7d-c6884c72b595",
          startDate: "2025-04-12T19:42:26.390Z",
          endDate: "2025-10-17T16:47:10.640Z",
          occupancy: 3144,
          title: "Fish superstructure",
          subtitle: "Luxurious",
          description: "Pula Turkey gah Gasoline transmitting",
          bgColor: "rgb(53,166,158)"
        },
        {
          id: "045a7a8e-0338-4605-97ef-2f8805ea0608",
          startDate: "2025-08-01T14:35:02.739Z",
          endDate: "2025-11-01T06:49:00.170Z",
          occupancy: 19224,
          title: "Fish superstructure",
          subtitle: "and",
          description: "home Incredible woman firewall back",
          bgColor: "rgb(53,166,158)"
        }
      ]
    },
    {
      id: "fed93c26-50e8-48e9-8323-36e48497848f",
      label: {
        icon: "https://picsum.photos/24",
        title: "yawningly numb",
        subtitle: "Shoes"
      },
      data: [
        {
          id: "764d43e5-9caf-4e0f-9d3c-bd24e1761c12",
          startDate: "2025-05-21T05:59:44.004Z",
          endDate: "2025-10-01T05:44:28.717Z",
          occupancy: 21273,
          title: "yawningly numb",
          subtitle: "Account",
          description: "ASCII Bentley Assurance Northeast Classical",
          bgColor: "rgb(121,68,92)"
        },
        {
          id: "daafc417-0c25-4b51-90d5-339a007e609c",
          startDate: "2025-01-18T04:22:18.584Z",
          endDate: "2027-11-25T18:48:37.495Z",
          occupancy: 11972,
          title: "yawningly numb",
          subtitle: "transitional",
          description: "Southeast Facilitator draw Bellevue inasmuch",
          bgColor: "rgb(121,68,92)"
        },
        {
          id: "8b965e43-6ce1-4473-b87c-481c3e103511",
          startDate: "2025-01-02T10:37:55.952Z",
          endDate: "2025-08-31T11:52:19.637Z",
          occupancy: 27334,
          title: "yawningly numb",
          subtitle: "Agent",
          description: "or plum enrapture Metrics up",
          bgColor: "rgb(121,68,92)"
        }
      ]
    }
  ];

  const filteredData = useMemo(
    () =>
      mocked.map((person) => ({
        ...person,
        data: person.data.filter(
          (project) =>
            dayjs(project.startDate).isBetween(range.startDate, range.endDate) ||
            dayjs(project.endDate).isBetween(range.startDate, range.endDate) ||
            (dayjs(project.startDate).isBefore(range.startDate, "day") &&
              dayjs(project.endDate).isAfter(range.endDate, "day"))
        )
      })),
    [mocked, range.endDate, range.startDate]
  );

  const handleFilterData = () => console.log(`Filters button was clicked.`);

  const handleTileClick = (data: SchedulerProjectData) =>
    console.log(
      `Item ${data.title} - ${data.subtitle} was clicked. \n==============\nStart date: ${data.startDate} \n==============\nEnd date: ${data.endDate}\n==============\nOccupancy: ${data.occupancy}`
    );
  return (
    <>
      <ConfigPanel values={values} onSubmit={setValues} />
      {isFullscreen ? (
        <Scheduler
          startDate={values.startDate ? new Date(values.startDate).toISOString() : undefined}
          onRangeChange={handleRangeChange}
          data={data1}
          isLoading={false}
          onTileClick={handleTileClick}
          onFilterData={handleFilterData}
          config={{ zoom: 1, maxRecordsPerPage: maxRecordsPerPage, showThemeToggle: true }}
          onItemClick={(data) => console.log("clicked: ", data)}
        />
      ) : (
        <StyledSchedulerFrame>
          <Scheduler
            startDate={values.startDate ? new Date(values.startDate).toISOString() : undefined}
            onRangeChange={handleRangeChange}
            isLoading={false}
            data={data1}
            onTileClick={handleTileClick}
            onFilterData={handleFilterData}
            onItemClick={(data) => console.log("clicked: ", data)}
          />
        </StyledSchedulerFrame>
      )}
    </>
  );
}

export default App;
