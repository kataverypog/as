import React, {useState} from "react";
import {Select} from "antd";
import {CheckOutlined, CloseOutlined} from "@ant-design/icons";
import CloseBtn from "./CloseBtn";

const {Option} = Select;

export default function ModelSelector() {
    const [selectedModel, setSelectedModel] = useState("GPT-4o");

    const models = {
        "GPT-4o": {
            description: "Классическая и одна из умнейших моделей от OpenAi (ChatGPT).",
            features: {
                "Голосовое управление": true,
                "Выход в интернет": false,
                "Генерация изображений": true,
                "Обработка изображений": false,
                "Обработка файлов": false,
                "Преднастройки": true,
                "Выдача файлов": false,
            }
        },
        "DeepSeek": {
            description: "Классическая и одна из умнейших моделей от DeepSeek",
            features: {
                "Голосовое управление": true,
                "Выход в интернет": true,
                "Генерация изображений": true,
                "Обработка изображений": false,
                "Обработка файлов": false,
                "Преднастройки": false,
                "Выдача файлов": true,
            }
        },
    };

    const model = models[selectedModel];

    return (
        <div style={{padding: 20, borderRadius: 10}}>
            <div style={{marginBottom: 8}}>Модель</div>

            <Select
                value={selectedModel}
                onChange={setSelectedModel}
                style={{width: "100%", outline: "none"}}
            >
                {Object.keys(models).map((key) => (
                    <Option key={key} value={key} style={{
                        optionLineHeight: "1px"
                    }}>
                        {key}
                    </Option>
                ))}
            </Select>

            <p style={{marginTop: 16}}>{model.description}</p>

            <div style={{marginTop: 16}}>
                <p style={{fontWeight: "bold"}}>Дополнительные возможности:</p>
                <ul style={{listStyleType: "none"}}>
                    {Object.entries(model.features).map(([key, val]) => (
                        <li key={key}>
              <span style={{color: val ? "green" : "red", marginRight: 6}}>
                {val ? <CheckOutlined/> : <CloseOutlined/>}
              </span>
                            <span>{key}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <CloseBtn/>
        </div>
    );
}
