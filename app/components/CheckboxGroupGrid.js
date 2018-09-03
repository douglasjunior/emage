import React from 'react';

import {
    Checkbox, Row, Col,
} from './antd';
import styles from './CheckboxGroupGrid.scss';

const { Group: CheckboxGroup } = Checkbox;

const CheckboxGroupGrid = ({
    options, grid, onChange,
    defaultValue, value,
}) => (
    <CheckboxGroup
        className={styles.group}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
    >
        <Row>
            {options.length > 0
                ? options.map(opt => (
                    <Col {...grid} key={opt.value}>
                        <Checkbox value={opt.value}>{opt.label}</Checkbox>
                    </Col>
                ))
                : <p>Coming soon</p>}
        </Row>
    </CheckboxGroup>
);

export default CheckboxGroupGrid;
