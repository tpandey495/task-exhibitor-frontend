import React, { useEffect } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import ReactTooltip from 'react-tooltip';
import { useSelector, useDispatch } from 'react-redux';
import 'react-calendar-heatmap/dist/styles.css';
import { fetchConsistency } from 'store/progressSlice';
import './heatmap.css';

const Heatmap = () => {
  const { heatmapdata } = useSelector((state) => state.progress);
  const dispatch = useDispatch();
  const dates = [];
  const date = new Date();
  const today = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  // one before to current date
  const prevyear = `${date.getFullYear() - 1}-${date.getMonth()}-${date.getDate()}`;
  useEffect(() => {
    dispatch(fetchConsistency());
  }, [])
  return (
    <div className="heatmap">
      <CalendarHeatmap
        startDate={prevyear}
        endDate={today}
        values={heatmapdata}
        classForValue={value => {
          if (!value) {
            return 'color-empty';
          }
          if (value.count >= 4)
            return `color-github-4`;
          return `color-github-${value.count}`;
        }}
        tooltipDataAttrs={value => {
          return {
            'data-tip': `${value.date} has count: ${value.count}`,
          };
        }}
        showWeekdayLabels={true}
      />
      <ReactTooltip />
    </div>
  );
}



export default Heatmap;