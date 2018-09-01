import React from 'react';

import {
    Checkbox, Row, Col,
} from './antd';
import styles from './CheckboxGroupGrid.scss';

const { Group: CheckboxGroup } = Checkbox;

const CheckboxGroupGrid = props => {
    const {
        options, grid, onChange,
        defaultValue, value,
    } = props;
    return (
        <CheckboxGroup
            className={styles.group}
            value={value}
            defaultValue={defaultValue}
            onChange={onChange}
        >
            <Row>
                {options.map(opt => (
                    <Col {...grid}>
                        <Checkbox value={opt.value}>{opt.label}</Checkbox>
                    </Col>
                ))}
            </Row>
        </CheckboxGroup>
    );
};

export default CheckboxGroupGrid;
