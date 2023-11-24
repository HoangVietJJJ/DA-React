import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './DoctorSchedule.scss';
import moment from 'moment';
import localization from 'moment/locale/vi'
import { LANGUAGES } from '../../../utils';
import { getDoctorScheduleByDateService } from '../../../services/userService'

class DoctorSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            availableTimes: [],
        }
    }

    async componentDidMount() {
        let { language } = this.props;

        console.log('moment vie', moment(new Date()).format('dddd - DD/MM'));
        console.log('moment en', moment(new Date()).locale('en').format('dddd - DD/MM'))
        this.setArrDay(language);

    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    setArrDay = (language) => {
        let arrDate = []
        for (let i = 0; i < 7; i++) {
            let object = {}
            if (language === LANGUAGES.VI) {
                let labelVN = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                object.label = this.capitalizeFirstLetter(labelVN)
            } else {
                object.label = moment(new Date()).add(i, 'days').locale('en').format('dddd - DD/MM');
            }

            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();

            arrDate.push(object)
        }


        this.setState({
            allDays: arrDate,
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            this.setArrDay(this.props.language);
        }
    }

    handeOnchangeSelect = async (event) => {
        if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
            let doctorId = this.props.doctorIdFromParent;
            let date = event.target.value;
            let res = await getDoctorScheduleByDateService(doctorId, date);

            if (res && res.errCode === 0) {
                this.setState({
                    availableTimes: res.data ? res.data : []
                })
            }

            console.log('check response schedule: ', res)
        }
    }

    render() {
        let { allDays, availableTimes } = this.state;
        let { language } = this.props;
        return (
            <div className='doctor-schedule-container'>
                <div className='time-table'>
                    <select onChange={(event) => this.handeOnchangeSelect(event)}>
                        {allDays && allDays.length > 0 &&
                            allDays.map((item, index) => {
                                return (
                                    <option value={item.value} key={index}>{item.label}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className='schedule-list'>
                    <div className='text-callendar'>
                        <i className="fas fa-calendar-alt"><span>Lịch khám</span></i>
                    </div>
                    <div className='time-content'>
                        {availableTimes && availableTimes.length > 0 ?
                            availableTimes.map((item, index) => {
                                let timeDisplay = language === LANGUAGES.VI
                                    ? item.timeTypeData.valueVi : item.timeTypeData.valueEn
                                return (
                                    <button key={index}>{timeDisplay}</button>
                                )
                            })

                            : <div>Hôm nay bác sĩ không nhận lịch hẹn, vui lòng chọn ngày khác!</div>
                        }

                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
