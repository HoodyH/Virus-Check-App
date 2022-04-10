import base64
import ipaddress
import json
import os
import aiohttp


class VirusTotal:
    """Class to manage the api of virus total"""
    BASE_API_URL = 'https://www.virustotal.com/api/v3'
    HEADERS = {'x-apikey': os.getenv('API_KEY')}

    @classmethod
    async def _make_request(cls, path, target):
        """http request to the virus total api"""
        async with aiohttp.ClientSession() as session:
            async with session.get(f'{cls.BASE_API_URL}/{path}/{target}', headers=cls.HEADERS) as response:

                if response.ok:
                    return json.loads(await response.content.read())
                raise ConnectionError

    @staticmethod
    def _analyze_response(data):
        """read the data from the api response and evaluate if the target it's dangerous or not"""
        out = data['data']['attributes']['last_analysis_stats']
        out['is_threat'] = False  # by default set the target as not threat

        malicious = out.get('malicious', 0)
        suspicious = out.get('suspicious', 0)
        harmless = out.get('harmless', 0)

        if harmless < 2:
            out['is_threat'] = True
        elif malicious / harmless > 0.1:
            out['is_threat'] = True
        elif suspicious / harmless > 0.5:
            out['is_threat'] = True

        return out

    async def get_ip_data(self, ip: str):
        """analyze data as ip input"""
        data = await self._make_request('ip_addresses', ip)
        return self._analyze_response(data)

    async def get_url_data(self, url: str):
        """analyze data as url input"""
        encoded_url = base64.urlsafe_b64encode(url.encode()).decode().strip("=")
        data = await self._make_request('urls', encoded_url)
        return self._analyze_response(data)


async def check_on_virustotal(target: str) -> dict:
    """
    :param target: a string of what you have to analyze
    :return: {
        "harmless": 11,
        "malicious": 1,
        "suspicious": 0,
        "timeout": 0,
        "undetected": 1
    }
    """

    vt = VirusTotal()
    try:
        ip = ipaddress.ip_address(target)
        return await vt.get_ip_data(ip)
    except ValueError:
        return await vt.get_url_data(target)


async def main():
    """main for debug purposes, remember to set the API_KEY environ variable"""
    print(await check_on_virustotal('1.1.1.1'))
    print(await check_on_virustotal('https://www.virustotal.com/api/v3'))


if __name__ == '__main__':
    """locally test the api"""
    import asyncio

    loop = asyncio.get_event_loop()
    loop.run_until_complete(main())
