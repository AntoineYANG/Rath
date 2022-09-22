import React, { useRef, useCallback } from 'react';
import { FileReader } from '@kanaries/web-data-loader';
import Table from './table';
import styled from 'styled-components';
import { useGlobalStore } from '../store';
import { observer } from 'mobx-react-lite';
import Rath from '@kanaries/rath-utils/dist/lib/global';


const Container = styled.div`
    overflow-x: auto;
`;

interface DSPanelProps {
}
const DataSourcePanel: React.FC<DSPanelProps> = props => {
    const fileRef = useRef<HTMLInputElement>(null);
    const { commonStore } = useGlobalStore();
    const { tmpDSName, tmpDataSource } = commonStore;

    const onSubmitData = useCallback(() => {
        commonStore.commitTempDS();
    }, [])
    return (
        <Container>
            <input
                style={{ display: 'none' }}
                type="file"
                ref={fileRef}
                onChange={(e) => {
                    const files = e.target.files;
                    if (files !== null) {
                        const file = files[0];
                        FileReader.csvReader({
                            file,
                            config: { type: 'reservoirSampling', size: Infinity },
                            onLoading: () => {}
                        }).then((data) => {
                            commonStore.updateTempDS(data as Rath.IRow[]);
                        });
                    }
                }}
            />
            <div className="mt-1 mb-1">
                <button className="inline-block min-w-96 text-xs mr-2 pt-1 pb-1 pl-6 pr-6 border border-gray-500 rounded-sm cursor-pointer hover:bg-gray-200"
                    onClick={() => { if (fileRef.current) { fileRef.current.click(); }}}
                >
                    上传数据
                </button>
                <button className="inline-block min-w-96 text-xs mr-2 pt-1 pb-1 pl-6 pr-6 bg-yellow-600 rounded-sm hover:bg-yellow-500 text-white font-bold disabled:bg-gray-300"
                    disabled={tmpDataSource.length === 0}
                    onClick={() => { onSubmitData(); }}
                >
                    确认
                </button>
            </div>
            <div className="mt-1 mb-1">
                <label className="block text-xs text-gray-800">数据集名称</label>
                <input type="text" placeholder="数据集名称"
                    value={tmpDSName}
                    onChange={e => {
                        commonStore.updateTempName(e.target.value)
                    }}
                    className="text-xs p-1 border border-gray-300 outline-none focus:outline-none focus:border-blue-500"
                />
            </div>
            <Table />
        </Container>
    );
}

export default observer(DataSourcePanel);
