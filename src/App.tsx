/* eslint-disable no-unused-vars */
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

  // const filteredData = useMemo(
  //   () =>
  //     mocked.map((person) => ({
  //       ...person,
  //       data: person.data.filter(
  //         (project) =>
  //           dayjs(project.startDate).isBetween(range.startDate, range.endDate) ||
  //           dayjs(project.endDate).isBetween(range.startDate, range.endDate) ||
  //           (dayjs(project.startDate).isBefore(range.startDate, "day") &&
  //             dayjs(project.endDate).isAfter(range.endDate, "day"))
  //       )
  //     })),
  //   [mocked, range.endDate, range.startDate]
  // );
  const filteredData = [
    {
      id: "9269bff5-1419-49b9-a2e3-e95f35bb8b23",
      label: {
        icon: "https://picsum.photos/24",
        title: "decipher Northwest",
        subtitle: "failing"
      },
      data: [
        // {
        //   id: "c27ad670-e14f-45d4-8ba5-26d293f23a43",
        //   startDate: new Date("2025-01-18T03:16:39.545Z"),
        //   endDate: new Date("2025-01-20T21:18:40.057Z"),
        //   occupancy: 23800,
        //   title: "decipher Northwest",
        //   subtitle: "weber",
        //   description: "Pickup Riel copying Folding Borders",
        //   bgColor: "#3ac2ba",
        //   status: "approved"
        // },
        // {
        //   id: "c27ad670-e14f-45d4-8ba5-26d293f23a34",
        //   startDate: new Date("2025-01-18T03:16:39.545Z"),
        //   endDate: new Date("2025-01-20T21:18:40.057Z"),
        //   occupancy: 23800,
        //   title: "decipher Northwest",
        //   subtitle: "weber",
        //   description: "Pickup Riel copying Folding Borders",
        //   bgColor: "#5ab",
        //   status: "approved"
        // },
        {
          id: "c27ad670-e14f-45d4-8ba5-26d293f23b34",
          startDate: new Date("2025-01-18"),
          endDate: new Date("2025-01-25"),
          occupancy: 23800,
          title: "decipher Northwest",
          subtitle: "weber",
          description: "Pickup Riel copying Folding Borders",
          bgColor: "#5ab",
          status: "pending"
        }
      ]
    },
    {
      id: "5f2b9c16-863d-4793-975e-9873ee4ad129",
      label: {
        icon: "https://picsum.photos/24",
        title: "Senior Borders",
        subtitle: "Weymouth"
      },
      data: []
    },
    {
      id: "b4168592-0c40-422e-a7e2-bc4dbf6da815",
      label: {
        icon: "https://picsum.photos/24",
        title: "Hybrid Industrial",
        subtitle: "solid"
      },
      data: []
    }
];

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
          data={filteredData}
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
            data={filteredData}
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
