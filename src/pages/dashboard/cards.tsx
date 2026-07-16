//kept sometihings commented beacuse of mobx to integrate popup functionality here
import React from 'react';
import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import GoogleDrive from '@/components/load-modal/google-drive';
import Dialog from '@/components/shared_ui/dialog';
import MobileFullPageModal from '@/components/shared_ui/mobile-full-page-modal';
import { DBOT_TABS } from '@/constants/bot-contents';
import { useStore } from '@/hooks/useStore';
import {
    DerivLightBotBuilderIcon,
    DerivLightGoogleDriveIcon,
    DerivLightLocalDeviceIcon,
    DerivLightMyComputerIcon,
    DerivLightQuickStrategyIcon,
} from '@deriv/quill-icons/Illustration';
import { localize } from '@deriv-com/translations';
ls.husky;
import { useDevice } from '@deriv-com/ui';
import { rudderStackSendOpenEvent } from '../../analytics/rudderstack-common-events';
import { rudderStackSendDashboardClickEvent } from '../../analytics/rudderstack-dashboard';
import DashboardBotList from './bot-list/dashboard-bot-list';

type TCardProps = {
    has_dashboard_strategies: boolean;
    is_mobile: boolean;
};

type TCardArray = {
    id: string;
    icon: React.ReactElement;
    content: React.ReactElement;
    callback: () => void;
};

const Cards = observer(({ is_mobile, has_dashboard_strategies }: TCardProps) => {
    const { dashboard, load_modal, quick_strategy } = useStore();
    const { toggleLoadModal, setActiveTabIndex } = load_modal;
    const { isDesktop } = useDevice();
    const { onCloseDialog, dialog_options, is_dialog_open, setActiveTab, setPreviewOnPopup } = dashboard;
    const { setFormVisibility } = quick_strategy;

    const openGoogleDriveDialog = () => {
        toggleLoadModal();
        setActiveTabIndex(is_mobile ? 1 : 2);
        setActiveTab(DBOT_TABS.BOT_BUILDER);
    };

    const openFileLoader = () => {
        toggleLoadModal();
        setActiveTabIndex(is_mobile ? 0 : 1);
        setActiveTab(DBOT_TABS.BOT_BUILDER);
    };

    const actions: TCardArray[] = [
        {
            id: 'my-computer',
            icon: is_mobile ? (
                <DerivLightLocalDeviceIcon height='42px' width='42px' />
            ) : (
                <DerivLightMyComputerIcon height='42px' width='42px' />
            ),
            content: (
                <>
                    <h4>Upload Bot</h4>
                    <p>Import an XML bot from your computer</p>
                </>
            ),
            callback: () => {
                openFileLoader();
                rudderStackSendOpenEvent({
                    subpage_name: 'bot_builder',
                    subform_source: 'dashboard',
                    subform_name: 'load_strategy',
                    load_strategy_tab: 'local',
                });
            },
        },

        {
            id: 'google-drive',
            icon: <DerivLightGoogleDriveIcon height='42px' width='42px' />,
            content: (
                <>
                    <h4>Google Drive</h4>
                    <p>Import your saved trading bot</p>
                </>
            ),
            callback: () => {
                openGoogleDriveDialog();
                rudderStackSendOpenEvent({
                    subpage_name: 'bot_builder',
                    subform_source: 'dashboard',
                    subform_name: 'load_strategy',
                    load_strategy_tab: 'google drive',
                });
            },
        },

        {
            id: 'bot-builder',
            icon: <DerivLightBotBuilderIcon height='42px' width='42px' />,
            content: (
                <>
                    <h4>Bot Builder</h4>
                    <p>Create your own trading bot visually</p>
                </>
            ),
            callback: () => {
                setActiveTab(DBOT_TABS.BOT_BUILDER);
                rudderStackSendDashboardClickEvent({
                    dashboard_click_name: 'bot_builder',
                    subpage_name: 'bot_builder',
                });
            },
        },

        {
            id: 'quick-strategy',
            icon: <DerivLightQuickStrategyIcon height='42px' width='42px' />,
            content: (
                <>
                    <h4>Quick Strategy</h4>
                    <p>Generate a ready-made strategy instantly</p>
                </>
            ),
            callback: () => {
                setActiveTab(DBOT_TABS.BOT_BUILDER);
                setFormVisibility(true);

                rudderStackSendOpenEvent({
                    subpage_name: 'bot_builder',
                    subform_source: 'dashboard',
                    subform_name: 'quick_strategy',
                });
            },
        },
    ];
    return React.useMemo(
        () => (
            <div
                className={classNames('tab__dashboard__table', {
                    'tab__dashboard__table--minimized': has_dashboard_strategies && is_mobile,
                })}
            >
                <div className='dopra-actions'>
                    <div className='dopra-section-title'>QUICK ACTIONS</div>

                    <div className='dopra-action-grid'>
                        {actions.map(icons => {
                            const { icon, content, callback, id } = icons;
                            return (
                                <div key={id} className={`dopra-card ${id}`} onClick={callback}>
                                    <div className='dopra-card__icon'>{icon}</div>

                                    <div className='dopra-card__content'>{content}</div>

                                    <div className='dopra-card__link'>Open →</div>
                                </div>
                            );
                        })}

                        {!isDesktop ? (
                            <Dialog
                                title={dialog_options.title}
                                is_visible={is_dialog_open}
                                onCancel={onCloseDialog}
                                is_mobile_full_width
                                className='dc-dialog__wrapper--google-drive'
                                has_close_icon
                            >
                                <GoogleDrive />
                            </Dialog>
                        ) : (
                            <MobileFullPageModal
                                is_modal_open={is_dialog_open}
                                className='load-strategy__wrapper'
                                header={localize('Load strategy')}
                                onClickClose={() => {
                                    setPreviewOnPopup(false);
                                    onCloseDialog();
                                }}
                                height_offset='80px'
                                page_overlay
                            >
                                <div label='Google Drive' className='google-drive-label'>
                                    <GoogleDrive />
                                </div>
                            </MobileFullPageModal>
                        )}
                    </div>
                </div>

                <DashboardBotList />
            </div>
        ),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [is_dialog_open, has_dashboard_strategies]
    );
});

export default Cards;
