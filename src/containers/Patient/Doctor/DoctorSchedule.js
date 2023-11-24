import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './DoctorSchedule.scss';
import { FormattedMessage } from 'react-intl';
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

        let allDays = this.getArrDays(language);
        this.setState({
            allDays: allDays,
        })
    }


    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    getArrDays = (language) => {
        let allDays = []
        for (let i = 0; i < 7; i++) {
            let object = {}
            if (language === LANGUAGES.VI) {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Hôm nay - ${ddMM}`;
                    object.label = today;
                } else {
                    let labelVN = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                    object.label = this.capitalizeFirstLetter(labelVN);
                }

            } else {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Today - ${ddMM}`;
                    object.label = today;
                } else {
                    object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
                }
            }

            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();

            allDays.push(object)
        }

        return allDays;
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            let allDays = this.getArrDays(this.props.language);
            this.setState({
                allDays: allDays
            })
        }
        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            let allDays = this.getArrDays(this.props.language);
            let res = await getDoctorScheduleByDateService(this.props.doctorIdFromParent, allDays[0].value);
            this.setState({
                availableTimes: res.data ? res.data : []
            })
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
                        <i className="fas fa-calendar-alt">
                            <span><FormattedMessage id='patient.detail-doctor.schedule' /></span>
                        </i>
                    </div>
                    <div className='time-content'>
                        {availableTimes && availableTimes.length > 0 ?
                            <>
                                <div className='time-content-btn'>
                                    {availableTimes.map((item, index) => {
                                        let timeDisplay = language === LANGUAGES.VI
                                            ? item.timeTypeData.valueVi : item.timeTypeData.valueEn
                                        return (
                                            <button key={index}
                                                className={language === LANGUAGES.VI ? 'btn-vi' : 'btn-en'}>
                                                {timeDisplay}
                                            </button>
                                        )
                                    })}
                                </div>


                                <div className='book-free'>
                                    <span>
                                        <FormattedMessage id='patient.detail-doctor.choose' />
                                        <i className="far fa-hand-point-up"></i>
                                        <FormattedMessage id='patient.detail-doctor.book-free' />
                                    </span>
                                </div>
                            </>
                            : <div className='notice'>
                                <FormattedMessage id='patient.detail-doctor.notice' />
                            </div>
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
