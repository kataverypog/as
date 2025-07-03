import React from 'react';
import {Button} from "antd";

const CloseBtn = () => {
    return (
        <Button
            type="primary"
            style={{marginTop: 24, width: "100%", backgroundColor: "#9254de", borderColor: "#9254de"}}
            onClick={() => window.Telegram?.WebApp?.close()}
        >
            Закрыть окно
        </Button>
    );
};

export default CloseBtn;