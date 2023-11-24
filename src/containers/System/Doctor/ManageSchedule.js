import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSchedule.scss';
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as actions from '../../../store/actions';
import { CRUD_ACTIONS, LANGUAGES, dateFormat } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import { toast } from "react-toastify";
import _ from 'lodash';
import { saveBulkScheduleService } from '../../../services/userService';

class ManageSchedule extends Component {

    constructor(props) {
        super(props);

        this.state = {
            listDoctors: [],
            selectedDoctorPlan: {},
            currentDate: '',
            rangeTime: [],
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctorsRedux();
        this.props.fetchAllScheDuleHoursRedux();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.allDoctorsArr !== this.props.allDoctorsArr) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctorsArr)
            this.setState({
                listDoctors: dataSelect
            })
        }

        if (prevProps.schedulesArr !== this.props.schedulesArr) {
            let data = this.props.schedulesArr;
            if (data && data.length > 0) {
                // data.map(item => {
                //     item.isSelected = false
                //     return item
                // })
                data = data.map(item => ({ ...item, isSelected: false }))
            }

            this.setState({
                rangeTime: data
            })
        }

        // if (prevProps.language !== this.props.language) {
        //     let dataSelect = this.buildDataInputSelect(this.props.allDoctorsArr)
        //     this.setState({
        //         listDoctors: dataSelect
        //     })
        // }
    }

    buildDataInputSelect = (inputData) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`;
                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                result.push(object)
            })

        }

        return result;
    }

    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctorPlan: selectedDoctor });


    }

    handleOnChangeDatePicker = (date) => {
        //const today = new Date(); // Ngày hiện tại
        //const currentDate = date[0] && date[0] > today ? date[0] : today;
        this.setState({
            currentDate: date[0] //currentDate
        })
    }

    handleClickButtonTime = (time) => {
        let rangeTime = this.state.rangeTime;
        if (rangeTime && rangeTime.length > 0) {
            rangeTime = rangeTime.map(item => {
                if (item.id === time.id) item.isSelected = !item.isSelected;
                return item;
            })
            this.setState({
                rangeTime: rangeTime
            })
        }
    }

    handleSaveScheduleButton = async () => {
        let { rangeTime, selectedDoctorPlan, currentDate } = this.state;
        let result = [];

        if (!currentDate) {
            toast.error("Invalid date!")
            return;
        }
        if (selectedDoctorPlan && _.isEmpty(selectedDoctorPlan)) {
            toast.error("Missing doctor!")
            return;
        }

        //let formatedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER);
        //let formatedDate = moment(currentDate).unix();
        let formatedDate = new Date(currentDate).getTime();
        //let formatedDate = moment(currentDate).format('YYYY/MM/DD')

        if (rangeTime && rangeTime.length > 0) {
            let selectedTime = rangeTime.filter(item => item.isSelected === true)
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map(time => {
                    let object = {};
                    object.doctorId = selectedDoctorPlan.value;
                    object.date = formatedDate;
                    object.timeType = time.keyMap;
                    result.push(object);
                })
            } else {
                toast.error("Missing time!")
                return;
            }
        }

        let res = await saveBulkScheduleService({
            arrSchedule: result,
            doctorId: selectedDoctorPlan.value,
            formatedDate: formatedDate,

        });

        if (res && res.errCode === 0) {
            toast.success("Success!");
        } else {
            toast.error("Error!")
            console.log('error >>> res: ', res)
        }
    }

    render() {
        let rangeTime = this.state.rangeTime;
        let language = this.props.language;
        //let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
        return (
            <div className='manage-schedul-container'>
                <div className='m-s-title'>
                    <FormattedMessage id='manage-schedule.title' />
                </div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-6 form-group'>
                            <label><FormattedMessage id='manage-schedule.doctor-lable' /></label>
                            <Select
                                value={this.state.selectedDoctorPlan}
                                onChange={this.handleChangeSelect}
                                options={this.state.listDoctors}
                            />
                        </div>
                        <div className='col-6 form-group'>
                            <label><FormattedMessage id='manage-schedule.pick-time' /></label>
                            <DatePicker
                                onChange={this.handleOnChangeDatePicker}
                                className='form-control'
                                value={this.state.currentDate}
                                minDate={new Date()}
                            />
                        </div>
                        <div className='col-12 hour-container'>
                            {rangeTime && rangeTime.length > 0 &&
                                rangeTime.map((item, index) => {
                                    return (
                                        <button
                                            className={item.isSelected === true ? 'btn btn-schedule active' : 'btn btn-schedule'}
                                            key={index}
                                            onClick={() => this.handleClickButtonTime(item)}
                                        >
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </button>
                                    )
                                })
                            }
                        </div>
                        <div className='col-12'>
                            <button className='btn btn-primary btn-save-schedule'
                                onClick={() => this.handleSaveScheduleButton()}
                            >
                                <FormattedMessage id='manage-schedule.save-schedule' />
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        allDoctorsArr: state.admin.allDoctors,
        schedulesArr: state.admin.schedules,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorsRedux: () => dispatch(actions.fetchAllDoctors()),
        fetchAllScheDuleHoursRedux: () => dispatch(actions.fetchAllScheduleHours()),
        // saveBulkScheduleServiceRedux: (data) => dispatch(actions.saveBulkScheduleService(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
